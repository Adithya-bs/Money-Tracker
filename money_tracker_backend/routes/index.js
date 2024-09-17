var express = require('express');
var router = express.Router();
const path = require('path');

const Transaction = require('../models/Transaction')
const { getTransactions } = require('../db');


router.use(express.static(path.resolve(__dirname, '..', 'public', 'build')));
/* GET home page. */
router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, '/../public/build', 'index.html'));
});


// add transaction to database
router.post('/add', (req, res) => {
  const { title, price, date, note } = req.body;

  const newTransaction = new Transaction({
    title,
    price,
    date,
    note
  });

  newTransaction.save()
    .then((result) => {
      console.log(result);
      res.send(result);

    })
    .catch(err => {
      console.error(err.message);
      res.status(500).send('Server error');
    });
});

// getting last five records from the database. using the function defined in db.js
router.get('/Alltransactions', (req, res) => {
  getTransactions()
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res.status(500).json({ error: 'An error occurred while retrieving transactions' });
    });
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTransaction = await Transaction.findByIdAndDelete(id);

    if (!deletedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.status(200).json({ message: 'Transaction deleted successfully', transaction: deletedTransaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, price, date, note } = req.body;
  // console.log({title, price, date, note});

  try {
    // Find and update the transaction
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      { $set: { title, price, date, note } },
      { new: true, runValidators: true } // Return the updated document and validate
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.status(200).json(updatedTransaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



module.exports = router;

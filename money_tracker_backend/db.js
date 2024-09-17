const mongoose = require('mongoose');
const Transaction = require('./models/Transaction')

const connectDB = () => {
  const uri = process.env.DB_URL;
  mongoose.connect(uri, {
    dbName: 'money_tracker',
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('MongoDB connected...');
    })
    .catch((err) => {
      console.error(err.message);
      process.exit(1);
    });
};


async function getTransactions() {
  try {
    const transactions = await Transaction.find()
      .sort({ _id: -1 }) // Sort by _id in ascending order
    // .limit(5); // Limit to 5 records
    return transactions;
  } catch (error) {
    console.error('Error retrieving transactions:', error);
  }
}

module.exports = { connectDB, getTransactions };
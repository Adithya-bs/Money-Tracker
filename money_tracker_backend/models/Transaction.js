const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    title: String,
    price: Number,
    date: Date,
    note: String
});




module.exports = mongoose.model('Transaction', transactionSchema, 'transactions');
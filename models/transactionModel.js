const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    collect_id: String,
    school_id: String,
    school_name: String,
    gateway: String,
    order_amount: Number,
    payment_method: String,
    transaction_amount: Number,
    status: String,
    custom_order_id: String,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;

const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    collect_id: String,
    gateway: String,
    payment_method: String,
    transaction_amount: Number,
    status: String,
    bank_reference: String,
    custom_order_id: String,
});

const SchoolTransaction = mongoose.model('SchoolTransaction', transactionSchema);

module.exports = SchoolTransaction;

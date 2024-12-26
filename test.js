const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Connection error:', err));

const transactionSchema = new mongoose.Schema({
    collect_id: String,
    school_id: String,
    gateway: String,
    order_amount: Number,
    transaction_amount: Number,
    status: String,
    custom_order_id: String,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

// Insert a sample document
const testTransaction = new Transaction({
    collect_id: '123',
    school_id: '456',
    gateway: 'Stripe',
    order_amount: 1000,
    transaction_amount: 950,
    status: 'success',
    custom_order_id: 'order_001',
});

testTransaction.save()
    .then(() => {
        console.log('Test transaction saved');
        return Transaction.find();
    })
    .then((data) => {
        console.log('All transactions:', data);
        mongoose.connection.close();
    })
    .catch((err) => console.error('Error:', err));

const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
    name: String,
    school_id: String,
    school_name: String,
    phone_number: String,
    email: String,
    school_id: String,
}, { timestamps: true });



const School = mongoose.model('school', schoolSchema);

module.exports = School;

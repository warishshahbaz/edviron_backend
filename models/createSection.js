const mongoose = require('mongoose');

// Sub-schema for data
const dataSchema = new mongoose.Schema({
    className: { type: String, required: true }, // Class name is required
    section: { type: String, required: true },   // Section is required
});

// Main schema
const sectionSchema = new mongoose.Schema(
    {
        school_id: { type: String, required: true, index: true }, // School ID is required and indexed
        data: dataSchema, // Using the sub-schema
    },
    { timestamps: true } // Adds createdAt and updatedAt fields
);

// Creating the model
const Section = mongoose.model('section', sectionSchema);

module.exports = Section;

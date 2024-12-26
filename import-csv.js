const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const Transaction = require('./models/transactionModel');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;
const filePath = "C:\\Users\\zcsu022.ZCS-AD\\Downloads\\transaction.csv"; // Update this path if necessary

const importCSV = async (req, res) => {
    try {
        // Check if the file exists
        if (!fs.existsSync(filePath)) {
            console.error('File does not exist:', filePath);
            return;
        }

        // Connect to MongoDB
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully.');

        const results = [];
        // Read and parse the CSV file
        await fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => {
                console.log('Parsed data:', data); // Debug parsed data
                results.push(data);
            })
            .on('end', async () => {
                console.log('Final results:', results); // Debug all rows
                try {
                    await Transaction.insertMany(results);
                    console.log('Data inserted successfully');
                } catch (err) {
                    console.error('Error inserting data:', err.message);
                } finally {
                    mongoose.connection.close();
                }
            })
            .on('error', (err) => {
                console.error('Error reading CSV file:', err.message);
            });
        res.status(200).send("Data imported successfully");
    } catch (err) {
        res.status(500).send("Error importing data");
        console.error('Error connecting to MongoDB or processing the file:', err.message);
    }
};

module.exports = importCSV;

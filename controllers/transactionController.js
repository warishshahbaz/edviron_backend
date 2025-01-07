const Section = require('../models/createSection');
const UserSignup = require('../models/signupSchema');
const Transaction = require('../models/transactionModel');
const School = require('../models/usrecreate');
const bcrypt = require("bcryptjs");
require('dotenv').config(); // Make sure this is called at the top
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;

// Helper function to generate JWT
const generateToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
        expiresIn: "1h",
    });
};

// Fetch all transactions
const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fetch transactions by school ID
const getTransactionsBySchool = async (req, res) => {
    const { schoolId } = req.params;
    try {
        const transactions = await Transaction.find({ school_id: schoolId });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fetch transaction status by custom order ID
const getTransactionStatus = async (req, res) => {
    const { customOrderId } = req.params;
    try {
        const transaction = await Transaction.findOne({ custom_order_id: customOrderId });
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Webhook to update transaction status
const webhookUpdate = async (req, res) => {
    const { order_info } = req.body;
    try {
        const transaction = await Transaction.findOneAndUpdate(
            { collect_id: order_info.order_id },
            { status: order_info.status },
            { new: true }
        );
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Manual update of transaction status
const manualUpdate = async (req, res) => {
    const { customOrderId, status } = req.body;
    try {
        const transaction = await Transaction.findOneAndUpdate(
            { custom_order_id: customOrderId },
            { status },
            { new: true }
        );
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createSchool = async (req, res) => {

    const { name, phone_number, email, school_name, school_id } = req.body;
    try {
        let response = await School.create({ name, phone_number, email, school_name, school_id });
        res.status(200).json({ message: response })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getSchool = async (req, res) => {
    try {
        let response = await School.find();
        res.status(200).json({ message: response })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createSection = async (req, res) => {
    const { school_id, data } = req.body;
    try {
        let response = await Section.create({ school_id, data });
        res.status(200).json({ message: response })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createSignup = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    try {
        // console.log(username, password);

        // Check if username already exists
        const existingUser = await UserSignup.find({ username });
        // console.log(existingUser, "------------existingUser------------");
        if (existingUser.length > 0) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await UserSignup.create({ username, password: hashedPassword });

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred. Please try again." });
    }
};




const createLogin = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    try {
        // Find the user
        const user = await UserSignup.findOne({ username }); // Use findOne and await
        // console.log(user, "-----------------user----------------")
        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id, username: user.username }, secretKey, {
            expiresIn: "1h",
        });

        return res.status(200).json({
            message: "Login successful",
            token,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred. Please try again." });
    }
};



module.exports = {
    getAllTransactions,
    getTransactionsBySchool,
    getTransactionStatus,
    webhookUpdate,
    manualUpdate,
    createSchool,
    createSection,
    getSchool,
    createSignup,
    createLogin
};

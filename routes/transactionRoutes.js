const express = require('express');
const {
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
} = require('../controllers/transactionController');
const importCSV = require('../import-csv');
const authMiddleware = require('../middalware/auth');

const router = express.Router();

router.get('/', authMiddleware, getAllTransactions);
router.get('/import', importCSV);
router.get('/school/:schoolId', getTransactionsBySchool);
router.get('/status/:customOrderId', getTransactionStatus);
router.post('/webhook', webhookUpdate);
router.post("/school", createSchool);
router.post("/section", createSection);
router.get("/school", getSchool);
router.put('/manual-update', manualUpdate);
router.post("/signup", createSignup);
router.post("/login", createLogin);

module.exports = router;

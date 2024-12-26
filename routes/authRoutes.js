const express = require('express');
const { createSignup, createLogin } = require('../controllers/transactionController');
const router = express.Router();

router.post('/signup', createSignup);
router.post('/login', createLogin);

module.exports = router;
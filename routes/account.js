const express = require('express')
const router = express.Router()

const { createAccount, loginAccount } = require('../src/controllers/AccountController')

router.post('/register', createAccount)
router.post('/login', loginAccount)

module.exports = router
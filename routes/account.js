const express = require('express')
const router = express.Router()

const { createAccount, loginAccount } = require('../src/controllers/AccountController')
const { hashPassword } = require('../src/middleware/auth')

router.post('/register', hashPassword, createAccount)
router.post('/login', loginAccount)

module.exports = router

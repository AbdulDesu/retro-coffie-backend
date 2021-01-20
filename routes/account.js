const express = require('express')
const router = express.Router()

const { createAccount } = require('../src/controllers/AccountController')

router.post('/register', createAccount)

module.exports = router

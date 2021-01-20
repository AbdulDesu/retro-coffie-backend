const express = require('express')
const router = express.Router()

const {
    addCategory,
    getAllCategory,
    getCategoryById,
    updateCategory
  } = require('../src/controllers/CategoryController')
  
  router.get('/', getAllCategory)
  router.get('/:ct_id', getCategoryById)
  router.post('/add/', addCategory)
  router.put('/update/:ct_id', updateCategory)

  
  module.exports = router
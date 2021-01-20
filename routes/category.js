const express = require('express')
const router = express.Router()

const {
    addCategory,
    getAllCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
  } = require('../src/controllers/CategoryController')
  
  router.get('/', getAllCategory)
  router.get('/:ct_id', getCategoryById)
  router.post('/add/', addCategory)
  router.put('/update/:ct_id', updateCategory)
  router.delete('/delete/:ct_id', deleteCategory)

  module.exports = router
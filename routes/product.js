const express = require('express')
const router = express.Router()

const {
  addProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  updateProductWithImage,
  deleteProduct
} = require('../src/controllers/ProductController')

const uploadProductPic = require('../src/middleware/multer_product')

router.get('/', getAllProduct)
router.get('/:pr_id', getProductById)
router.post('/add/', uploadProductPic, addProduct)
router.put('/update/:pr_id', updateProduct)
router.put('/update/image/:pr_id', uploadProductPic, updateProductWithImage)
router.delete('/delete/:pr_id', deleteProduct)

module.exports = router

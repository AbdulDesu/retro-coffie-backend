const express = require('express')
const router = express.Router()

const { createCart, getAllCartByCsId, deleteCartByCsId, updateCartByCsId } = require('../src/controllers/CartController')

const uploadImage = require('../src/middleware/multer')

router.post('/', uploadImage, createCart)
router.get('/:csId', getAllCartByCsId)
router.delete('/:csId', deleteCartByCsId)
router.put('/:csId', uploadImage, updateCartByCsId)

module.exports = router

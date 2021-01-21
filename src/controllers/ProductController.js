const {
    addProductModel,
    getAllProductModel,
    getProductByIDModel,
    updateProductModel,
    deleteProductModel
  } = require('../models/ProductModel')

const {
    statusGet,
    statusCreate,
    statusCreateFail,
    statusServerError,
    statusNotFound,
    statusUpdate,
    statusDelete
} = require('../helpers/status')

module.exports = {
    addProduct: async (req, res, _next) => {
      req.body.pr_pic_image = req.file === undefined ? '' : req.file.filename
  
      const data = {
        ...req.body,
        pr_pic_image: req.body.pr_pic_image
      }
  
      delete data.pr_pic_image
  
      try {
        const result = await addProductModel(req.body)
  
        if (result.affectedRows) {
          statusCreate(res)
        } else {
          statusCreateFail(res)
        }
      } catch (err) {
        console.log(err)
        statusServerError(res)
      }
    },
  
    getAllProduct: async (req, res, _next) => {
      try {
        const result = await getAllProductModel()
  
        if (result.length) {
          statusGet(res, result)
        } else {
          statusNotFound(res)
        }
      } catch (error) {
        console.error(error)
        statusServerError(res)
      }
    },
  
    getProductById: async (req, res, _next) => {
      const { pr_id } = req.params
  
      try {
        const result = await getProductByIDModel(pr_id)
        if (result.length) {
          statusGet(res, result)
        } else {
          statusNotFound(res)
        }
      } catch (error) {
        console.error(error)
        statusServerError(res)
      }
    },
  
    updateProduct: async (req, res, _next) => {
      const { pr_id } = req.params
  
      try {
        const caughtData = await getProductByIDModel(pr_id)
  
        if (caughtData.length) {
          const result = await updateProductModel(pr_id, req.body)
  
          if (result.affectedRows) {
            statusUpdate(res, result)
          } else {
            statusNotFound(res)
          }
        } else {
          statusNotFound(res)
        }
      } catch (error) {
        console.error(error)
        statusServerError(res)
      }
    },
  
    updateProductWithImage: async (req, res, _next) => {
      const { pr_id } = req.params
  
      req.body.pr_pic_image = req.file === undefined ? '' : req.file.filename
  
      const data = {
        ...req.body,
        pr_pic_image: req.body.pr_pic_image
      }
  
      delete data.pr_pic_image
  
      try {
        const caughtData = await getProductByIDModel(pr_id)
  
        if (caughtData.length) {
          const result = await updateProductModel(pr_id, req.body)
  
          if (result.affectedRows) {
            statusUpdate(res, result)
          } else {
            statusNotFound(res)
          }
        } else {
          statusNotFound(res)
        }
      } catch (error) {
        console.error(error)
        statusServerError(res)
      }
    },
  
    deleteProduct: async (req, res, _next) => {
      const { pr_id } = req.params
  
      try {
        const caughtData = await getProductByIDModel(pr_id)
  
        if (caughtData.length) {
          const result = await deleteProductModel(pr_id)
  
          if (result.affectedRows) {
            statusDelete(res, result)
          } else {
            statusNotFound(res)
          }
        } else {
          statusNotFound(res)
        }
      } catch (error) {
        console.error(error)
        statusServerError(res)
      }
    }
  }
  
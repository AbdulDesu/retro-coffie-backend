const {
    addCategoryModel,
    getAllCategoryModel,
    getCategoryByIDModel,
    updateCategoryModel
  } = require('../models/CategoryModel')

  const {
    statusGet,
    statusCreate,
    statusCreateFail,
    statusServerError,
    statusNotFound,
    statusUpdate
  } = require('../helpers/status')

  module.exports = {
    addCategory: async (req, res, _next) => {
        try {
          const result = await addCategoryModel(req.body)
    
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
    
      getAllCategory: async (req, res, _next) => {
    
        try {
          const result = await getAllCategoryModel()
    
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

      getCategoryById: async (req, res, _next) => {
        const  { ct_id } = req.params

        try {
          const result = await getCategoryByIDModel(ct_id)
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

      updateCategory: async (req, res, _next) => {
        const  { ct_id } = req.params
        
        try {
          const caughtData = await getCategoryByIDModel(ct_id)
    
          if (caughtData.length){
            const result = await updateCategoryModel(ct_id, req.body)

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
  }
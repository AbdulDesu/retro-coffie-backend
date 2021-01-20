const {
  createOrders
} = require('../models/OrdersModel')

const {
  statusGet,
  statusCreate,
  statusCreateFail,
  statusServerError,
  statusNotFound
} = require('../helpers/status')

module.exports = {
  createOrders: async (req, res, _next) => {
    try {
      const result = await createOrders(req.body)

      if (result.affectedRows) {
        statusCreate(res)
      } else {
        statusCreateFail(res)
      }
    } catch (err) {
      console.log(err)
      statusServerError(res)
    }
  }
}

const dbConnect = require('../../config/db.config')

const { createCustomerModel } = require('../models/CustomerModel')

module.exports = {
  createAccountModel: (data) => {
    return new Promise((resolve, reject) => {
      const dataAcc = {
        ac_name: data.ac_name,
        ac_email: data.ac_email,
        ac_phone: data.ac_phone,
        ac_password: data.ac_password
      }

      const query = `
            INSERT INTO account
                    SET ?
          `

      dbConnect.query(query, dataAcc, async (err, res, _fields) => {
        if (!err) {
          await createCustomerModel(res.insertId)
          resolve(res)
        } else {
          reject(err)
        }
      })
    })
  },

  getAccountByEmailModel: (acEmail) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM account WHERE ?    
      `

      dbConnect.query(query, { ac_email: acEmail }, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }
}

const dbConnect = require('../../config/db.config')

module.exports = {
  addProductModel: (data) => {
    return new Promise((resolve, reject) => {
      const query = `
            INSERT INTO product
                    SET ?
          `
      dbConnect.query(query, data, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },

  getAllProductModel: () => {
    return new Promise((resolve, reject) => {
      const query = `
            SELECT * FROM product ORDER BY pr_id DESC
          `
      dbConnect.query(query, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },

  getProductByIDModel: (prId) => {
    return new Promise((resolve, reject) => {
      const query = `
          SELECT *
          FROM product
          WHERE ?
          `
      dbConnect.query(query, { pr_id: prId }, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },

  updateProductModel: (prId, data) => {
    return new Promise((resolve, reject) => {
      const query = `
          UPDATE 
          product
          SET ? 
          WHERE pr_id = ${prId}
          `
      dbConnect.query(query, data, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },

  deleteProductModel: (prId) => {
    return new Promise((resolve, reject) => {
      const query = `
          DELETE 
          FROM product
          WHERE ?
          `
      dbConnect.query(query, { pr_id: prId }, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }
}

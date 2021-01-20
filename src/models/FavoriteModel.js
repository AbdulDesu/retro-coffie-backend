const dbConnect = require('../../config/db.config')

module.exports = {
  createFavorite: (data) => {
    return new Promise((resolve, reject) => {
      const query = `
                INSERT INTO favorite
                        SET ?
              `
      dbConnect.query(query, data, (error, results, _fields) => {
        console.log(results)
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },
  getFavoriteByCsId: (csId) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT *
          FROM favorite
         WHERE ?
      `

      dbConnect.query(query, { cs_id: csId }, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },
  getFavoriteByFaId: (faId) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT *
          FROM favorite
         WHERE ?
      `

      dbConnect.query(query, { fa_id: faId }, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },
  deleteFavoriteByFaId: (faId) => {
    return new Promise((resolve, reject) => {
      const query = `
        DELETE FROM favorite
         WHERE ?
      `

      dbConnect.query(query, { fa_id: faId }, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }
}

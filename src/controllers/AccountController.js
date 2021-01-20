const bcrypt = require('bcrypt')

const { createAccountModel, getAccountByEmailModel } = require('../models/AccountModel')

const { statusRegistration, statusRegistrationFail, statusRegistrationUnique, statusServerError } = require('../helpers/status')

module.exports = {
  createAccount: async (req, res, _next) => {
    const { acName, acEmail, acPhone, acPassword } = req.body
    const salt = bcrypt.genSaltSync(10)
    const encryptPassword = bcrypt.hashSync(acPassword, salt)

    const setData = {
      ac_name: acName,
      ac_email: acEmail,
      ac_phone: acPhone,
      ac_password: encryptPassword
    }
    try {
      const findData = await getAccountByEmailModel(acEmail)
      if (!findData.length) {
        const result = await createAccountModel(setData)

        if (result.affectedRows) {
          statusRegistration(res)
        } else {
          statusRegistrationFail(res)
        }
      } else {
        statusRegistrationUnique(res)
      }
    } catch (err) {
      statusServerError(res)
    }
  }
}

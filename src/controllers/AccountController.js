const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {
  createAccountModel,
  getAccountByEmailModel,
  loginAccountModel
} = require('../models/AccountModel')

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
  },
  loginAccount: async (req, res) => {
    try {
      const { email, password } = req.body

      const login = await loginAccountModel(email)

      if (login.length >= 1) {
        const cekPsw = bcrypt.compareSync(password, login[0].ac_password)
        if (cekPsw) {
          console.log(login[0])
          const {
            ac_id,
            ac_name,
            ac_email,
            ac_phone,
            ac_level,
            ac_status,
            cs_id
          } = login[0]

          let peyLoad = {
            ac_id,
            ac_name,
            ac_email,
            ac_phone,
            ac_level,
            ac_status,
            cs_id
          }
          const token = jwt.sign(peyLoad, 'retrocoffee', { expiresIn: '7d' })
          peyLoad = { ...peyLoad, token }
          res.send({
            success: true,
            message: 'You are login',
            data: peyLoad
          })
        } else {
          res.status(400).send({
            success: false,
            message: 'Email or password wrong'
          })
        }
      } else {
        res.statu(402).send({
          success: false,
          message: 'Email or Account not register '
        })
      }
    } catch (error) {
      console.log(error)
      res.status(500).send({
        success: false,
        message: 'internal server error'
      })
    }
  }
}

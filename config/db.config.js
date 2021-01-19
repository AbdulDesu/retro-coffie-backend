const mysql = require('mysql')

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_retro_coffee'
})

conn.connect(err => {
  if (err) {
    console.error(err)
  } else {
    console.log('Database connected!')
  }
})

module.exports = conn

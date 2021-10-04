const { pool, createTableUsers } = require('../config/db')
const jwt = require('jsonwebtoken')

createTableUsers()

exports.login = (req, res) => {
  const { email, password } = req.body

  let user = {}

  pool.query('SELECT * FROM users where email = $1',
    [email], (error, results) => {
      if (error || results.rowCount == 0) {
        return res.status(401).json({ status: 'error', 
        message: 'Email not found!' })
      } else {
        user = results.rows[0]

        if (user.password !== password) {
          res.status(400).json({
            status: 'error',
            message: 'Invalid password!'
          })
        } else {
          const token = jwt.sign(
            user,
            process.env.JWT_SECRET,
            {
              expiresIn: '1h'
            })
            return res.status(200).json({
              message: 'Auth successful!',
              token: token
            })
        }
      }
    }
  )
}
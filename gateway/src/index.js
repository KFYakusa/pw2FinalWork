require('dotenv').config()

const express = require('express')
const cors = require('cors')
const httpProxy = require('express-http-proxy')

const checkAuth = require('./middlewares/check_auth')

const authRoutes = require('./routes/auth')

const filmesServiceProxy = httpProxy(process.env.API_FILMES_URL)
const categoriasServiceProxy = httpProxy(process.env.API_CATEGORIAS_URL)

const port = process.env.PORT

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    return res.status(200)
  }
  next()
})

// Auth
app.use('/', authRoutes)

// Filmes
app.all('/filme', checkAuth, (req, res, next) => {
  filmesServiceProxy(req, res, next)
})
app.all('/filme/:id', checkAuth, (req, res, next) => {
  filmesServiceProxy(req, res, next)
})

// Categorias
app.all('/categoria', checkAuth, (req, res, next) => {
  categoriasServiceProxy(req, res, next)
})
app.all('/categoria/:id', checkAuth, (req, res, next) => {
  categoriasServiceProxy(req, res, next)
})

app.use((req, res, next) => {
  const error = new Error('Not found!')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

app.listen(port, () => console.log(`Server running in port ${port}`))

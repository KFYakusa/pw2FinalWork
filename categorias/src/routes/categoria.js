const express = require('express')
const router = express.Router()

const CategoriaController = require('../controllers/categoria')

router
  .get('/', CategoriaController.getCategorias)
  .post('/', CategoriaController.addCategoria)
  .put('/', CategoriaController.updateCategoria)
  .get('/:id', CategoriaController.getCategoriaByID)
  .delete('/:id', CategoriaController.deleteCategoria)

module.exports = router

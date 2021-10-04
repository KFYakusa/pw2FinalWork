const express = require('express')
const router = express.Router()

const FilmeController = require('../controllers/filme')

router
  .get('/', FilmeController.getFilmes)
  .post('/', FilmeController.addFilme)
  .put('/', FilmeController.updateFilme)
  .get('/:id', FilmeController.getFilmeByID)
  .delete('/:id', FilmeController.deleteFilme)

module.exports = router

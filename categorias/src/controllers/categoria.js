const { pool, createTableCategorias } = require('../config/db')

createTableCategorias()

exports.getCategorias = (req, res) => {
  pool.query('SELECT * FROM categoria order by id',
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    }
  )
}

exports.getCategoriaByID = (req, res) => {
  const id = parseInt(req.params.id)
  pool.query('SELECT * FROM categoria where id = $1',
    [id], (error, results) => {
      if (error || results.rowCount == 0) {
        return res.status(401).json({ status: 'error', message: 'Categoria not found!' })
      }
      res.status(200).json(results.rows)
    }
  )
}

exports.addCategoria = (req, res) => {
  const { name, description } = req.body

  pool.query('INSERT INTO categoria (name, description) VALUES ($1, $2)',
    [name, description], (error) => {
      if (error) {
        console.log(error)
        throw error
      }
      res.status(201).json({ status: 'success', message: 'Categoria created!' })
    }
  )
}

exports.updateCategoria = (req, res) => {
  const { id, name, description } = req.body
  pool.query('UPDATE categoria set name=$1, description=$2 where id=$3',
    [name, description, id], error => {
      if (error) {
        console.log(error)
        throw error
      }
      res.status(201).json({ status: 'success', message: 'Categoria edited!' })
    }
  )
}

exports.deleteCategoria = (req, res) => {
  const id = parseInt(req.params.id)
  pool.query('DELETE from categoria where id=$1',
    [id], (error, results) => {
      if (error || results.rowCount == 0) {
        return res.status(401).json({ status: 'error', message: 'Error when removing Categoria!' })
      }
      res.status(201).json({ status: 'success', 
      message: 'Categoria removed!' })
    }
  )
}

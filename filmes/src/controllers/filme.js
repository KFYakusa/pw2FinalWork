const { pool, createTableFilmes } = require('../config/db')

createTableFilmes()

exports.getFilmes = (req, res) => {
  pool.query('SELECT * FROM filme order by id',
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    }
  )
}

exports.getFilmeByID = (req, res) => {
  const id = parseInt(req.params.id)
  pool.query('SELECT * FROM filme where id = $1',
    [id], (error, results) => {
      if (error || results.rowCount == 0) {
        return res.status(401).json({ status: 'error', 
        message: 'Filme not found!' })
      }
      res.status(200).json(results.rows)
    }
  )
}

exports.addFilme = (req, res) => {
  const { title, description, categoria } = req.body

  pool.query('SELECT * FROM categoria where id = $1',
    [categoria], (error, results) => {
      if (error || results.rowCount == 0) {
        return res.status(401).json({ status: 'error', message: 'Categoria not found!' })
      } else {
        pool.query('INSERT INTO filme (title, description, categoria_id) VALUES ($1, $2, $3)',
          [title, description, categoria], (error) => {
            if (error) {
              console.log(error)
              throw error
            }
            res.status(201).json({ status: 'success', message: 'Filme created!' })
          }
        )
      }
    }
  )
}

exports.updateFilme = (req, res) => {
  const { id, title, description, categoria } = req.body

  pool.query('SELECT * FROM categoria where id = $1',
    [categoria], (error, results) => {
      if (error || results.rowCount == 0) {
        return res.status(401).json({ status: 'error', message: 'Categoria not found!' })
      } else {
        pool.query('UPDATE filme set title=$1, description=$2, categoria_id=$3 where id=$4',
          [title, description, categoria, id], error => {
            if (error) {
              console.log(error)
              throw error
            }
            res.status(201).json({ status: 'success', message: 'Filme edited!' })
          }
        )
      }
    }
  )
}

exports.deleteFilme = (req, res) => {
  const id = parseInt(req.params.id)
  pool.query('DELETE from filme where id=$1',
    [id], (error, results) => {
      if (error || results.rowCount == 0) {
        return res.status(401).json({ status: 'error', 
        message: 'Error when removing Filme!', error })
      }
      res.status(201).json({ status: 'success', 
      message: 'Filme removed!' })
    }
  )
}

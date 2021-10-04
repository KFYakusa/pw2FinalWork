const { Pool } = require('pg')

const isProduction = process.env.NODE_ENV === 'production'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: !isProduction ? false : {
    rejectUnauthorized: false
  }
})

function createTableFilmes() {
  pool.query(`
    create table if not exists filme (
      id serial not null primary key,
      title varchar(50) not null,
      description varchar(50) not null,
      categoria_id serial not null,
      foreign key ("categoria_id") references "categoria"(id)
    );
  `)
}

module.exports = { pool, createTableFilmes }

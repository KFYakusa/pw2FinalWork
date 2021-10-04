const { Pool } = require('pg')

const isProduction = process.env.NODE_ENV === 'production'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: !isProduction ? false : {
    rejectUnauthorized: false
  }
})

function createTableCategorias() {
  pool.query(`
    create table if not exists categoria (
      id serial not null primary key,
      name varchar(50) not null,
      description varchar(50) not null
    );
  `)
}

module.exports = { pool, createTableCategorias }

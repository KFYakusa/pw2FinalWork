const { Pool } = require('pg')

const isProduction = process.env.NODE_ENV === 'production'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: !isProduction ? false : {
    rejectUnauthorized: false
  }
})

function createTableUsers() {
  pool.query(`
    create table if not exists users (
      id serial not null primary key,
      email varchar(50) not null,
      password varchar(30) not null
    );
    

    INSERT INTO users (
      email,
      password
    ) VALUES (
      'daniel@daniel.com',
      'senhaDaniel'
    );
  `)


}





module.exports = { pool, createTableUsers }

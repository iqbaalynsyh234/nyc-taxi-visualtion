const { Pool } = require('pg');

const pool = new Pool({
  user: 'iqbal',
  host: 'localhost',
  database: 'taxi_data',
  password: 'iqbal123',
  port: 5432,
});

module.exports = pool;

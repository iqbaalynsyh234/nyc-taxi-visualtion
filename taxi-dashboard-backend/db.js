const { Pool } = require('pg');

const pool = new Pool({
  user: '',
  host: '',
  database: '',
  password: '',
  port: 5,
});

module.exports = pool;
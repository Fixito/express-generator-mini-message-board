const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  ssl: { rejectUnauthorized: process.env.NODE_ENV === 'production' },
});

module.exports = {
  query: (text, params) => {
    return pool.query(text, params);
  },
};

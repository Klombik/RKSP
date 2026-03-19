const { Pool } = require('pg');
const config = require('./config');

const pool = new Pool({
  connectionString: config.databaseUrl,
  ssl: config.dbSsl ? { rejectUnauthorized: false } : false
});

const connectDB = async () => {
  try {
    await pool.query('SELECT NOW()');
    console.log('PostgreSQL подключен');
  } catch (error) {
    console.error('Ошибка подключения к PostgreSQL:', error.message);
    process.exit(1);
  }
};

module.exports = { pool, connectDB };
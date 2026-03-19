const path = require('path');
const dotenv = require('dotenv');

// Сначала пробуем загрузить .env для локальной разработки
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const toBool = (value, defaultValue = false) => {
  if (value === undefined) return defaultValue;
  return String(value).toLowerCase() === 'true';
};

const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  appHost: process.env.APP_HOST || 'localhost',
  databaseUrl:
    process.env.DATABASE_URL ||
    'postgresql://postgres:postgres@localhost:5432/food_diary',
  dbSsl: toBool(process.env.DB_SSL, false)
};

module.exports = config;
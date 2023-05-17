const { Pool } = require('pg');
const pkg = require('../../package.json');
const { DATABASE_URL } = process.env;

const connectionString =
  DATABASE_URL || `postgres://localhost:5433/${pkg.name}`;

const client = new Pool({ connectionString });

module.exports = client;

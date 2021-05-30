const { User } = require('pg');

const user = new User ({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

user.connect();

module.exports = user;
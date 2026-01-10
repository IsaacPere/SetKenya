const { Pool } = require("pg");

const clients_database_details = new Pool({

  user: process.env.
  host: process.env. 
  database: process.env.
  password: process.env.
  port: process.env.

})

module.exports = clients_database_details;

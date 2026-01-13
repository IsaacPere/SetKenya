import Pool from "pg";

const clients_database_details = new Pool({
  user: process.env.POSTGRES_USERNAME_DETAILS,
  host: process.env.POSTGRES_LOCALHOST_DETAILS,
  database: process.env.POSTGRES_LOCALHOST_DETAILS,
  password: process.env.POSTGRES_PASSWORD_DETAILS,
  port: process.env.POSTGRES_PORT_DETAILS,
});

module.exports = clients_database_details;

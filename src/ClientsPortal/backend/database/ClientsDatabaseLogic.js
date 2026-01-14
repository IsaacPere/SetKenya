const clients_database_details = require("./ClientsDatabase");

const checking_username_information = async (username) => {
  const clients_database_query = `SELECT * FROM clients WHERE username = '${username}' LIMIT 1`;
  const clients_values = [username];
  const clients_database_result = await clients_database_details.query(
    clients_database_query,
    clients_values,
  );
  return clients_database_result.rows[0];
};

const checking_clients_email_information = async (email) => {
  const clients_database_query = `SELECT * FROM clients WHERE email = '${email}' LIMIT 1`;
  const clients_values = [email];
  const clients_database_result = await clients_database_details.query(
    clients_database_query,
    clients_values,
  );
  return clients_database_result.rows[0];
};

const create_user_information = async ({
  first_name,
  middle_name,
  surname,
  username,
  email,
  password,
}) => {
  const clients_database_query = `INSERT INTO clients (first_name, middle_name, surname, username, email, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
  const clients_values = [
    first_name,
    middle_name,
    surname,
    username,
    email,
    password,
  ];
  const clients_database_result = await clients_database_details.query(
    clients_database_query,
    clients_values,
  );
  return clients_database_result.rows[0];
};

const reset_clients_password = async (userId, tokenHash, expireTime) => {
  const clients_database_query = `UPDATE clients SET password_reset_token = '${tokenHash}', password_reset_token_expires = '${expireTime}' WHERE id = '${userId}'`;
  const clients_values = [userId, tokenHash, expireTime];
  const clients_database_result = await clients_database_details.query(
    clients_database_query,
    clients_values,
  );
  return clients_database_result.rows[0];
};

module.exports = {
  checking_username_information,
  checking_clients_email_information,
  create_user_information,
  reset_clients_password,
};

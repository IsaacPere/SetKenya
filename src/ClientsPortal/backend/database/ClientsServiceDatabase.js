const clients_database_details = require("../database/ClientsDatabase");

const create_service_information = async ({
  clients_id,
  services_title,
  services_name,
  services_type,
  clients_phone_number,
  clients_email_address,
  services_description,
}) => {
  const clients_database_query = `
    INSERT INTO clients_services (
      clients_id,
      services_title,
      services_name,
      services_type,
      clients_phone_number,
      clients_email_address,
      services_description
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;

  const clients_values = [
    clients_id,
    services_title,
    services_name,
    services_type,
    clients_phone_number,
    clients_email_address,
    services_description,
  ];

  const clients_database_result = await clients_database_details.query(
    clients_database_query,
    clients_values,
  );

  return clients_database_result.rows[0];
};

const get_services_information = async () => {
  const clients_database_query = `
    SELECT s.*, c.username, c.email
    FROM clients_services s
    JOIN clients c ON c.id = s.clients_id
    ORDER BY s.created_at DESC;
  `;

  const clients_database_result = await clients_database_details.query(
    clients_database_query,
  );

  return clients_database_result.rows;
};

const get_services_clients_id = async (clients_id) => {
  const clients_database_query = `
    SELECT *
    FROM clients_services
    WHERE clients_id = $1
    ORDER BY created_at DESC;
  `;

  const clients_database_result = await clients_database_details.query(
    clients_database_query,
    [clients_id],
  );

  return clients_database_result.rows;
};

const get_services_by_id = async (service_id) => {
  const clients_database_query = `
    SELECT *
    FROM clients_services
    WHERE id = $1
    LIMIT 1;
  `;

  const clients_database_result = await clients_database_details.query(
    clients_database_query,
    [service_id],
  );

  return clients_database_result.rows[0];
};

const update_services_status = async (service_id, status) => {
  const clients_database_query = `
    UPDATE clients_services
    SET status = $1
    WHERE id = $2
    RETURNING *;
  `;

  const clients_database_result = await clients_database_details.query(
    clients_database_query,
    [status, service_id],
  );

  return clients_database_result.rows[0];
};

const delete_service_information = async (service_id) => {
  const clients_database_query = `
    DELETE FROM clients_services
    WHERE id = $1;
  `;

  await clients_database_details.query(clients_database_query, [service_id]);
};

module.exports = {
  create_service_information,
  get_services_information,
  get_services_clients_id,
  get_services_by_id,
  update_services_status,
  delete_service_information,
};

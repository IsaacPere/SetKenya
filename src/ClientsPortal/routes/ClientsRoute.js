const client_router_framework = require("express");
const clients_router_details = client_router_framework.Router();

clients_router_details.get(
  "/",
  (clients_service_request, clients_service_respond) => {
    clients_service_respond.render("main");
  },
);

module.exports = {
  clients_router_details,
};

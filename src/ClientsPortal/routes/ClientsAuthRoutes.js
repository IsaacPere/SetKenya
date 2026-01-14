const clients_gateways_technlogies = require("express");

const clients_gateways_router = clients_gateways_technlogies.Router();

const clients_login_details = require("../backend/gateway/login");
const clients_register_details = require("../backend/gateway/signup");
const clients_logout_details = require("../backend/gateway/logout");
const forgot_password_details = require("../backend/gateway/reset");

clients_gateways_router.get(
  "/login",
  (clients_login_request, clients_login_respond) => {
    clients_login_respond.render("login");
  },
);
clients_gateways_router.post("/login", clients_login_details);

clients_gateways_router.get(
  "/signup",
  (clients_register_request, clients_register_respond) => {
    clients_register_respond.render("signup");
  },
);
clients_gateways_router.post("/signup", clients_register_details);

clients_gateways_router.post("/logout", clients_logout_details);

clients_gateways_router.get(
  "/reset",
  (clients_register_request, clients_register_respond) => {
    clients_register_respond.render("resetlogin");
  },
);
clients_gateways_router.post("/reset", forgot_password_details);

module.exports = clients_gateways_router;

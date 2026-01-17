const clients_framework = require("express");
const path = require("path");
const hbs = require("hbs");
const clients_app = clients_framework();

const client_route = require("./routes/ClientsRoute.js");
const client_payment_route = require("./routes/ClientsPayRoutes.js");
const clients_authorization_routes = require("./routes/ClientsAuthRoutes.js");

clients_app.use(clients_framework.urlencoded({ extended: true }));
clients_app.use(clients_framework.json());

clients_app.set("views", path.join(__dirname, "views"));
clients_app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "views", "partials"));

clients_app.use("/", client_route);
clients_app.use("/clients/auth", clients_authorization_routes);
clients_app.use("/clients/payhere", client_payment_route);

module.exports = clients_app;

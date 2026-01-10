require("dotenv").config()
const company_web_framework = require("express");
const main_app = company_web_framework();
const app_port_details = process.env.SETKENYA_PORT_DETAILS || 2100;

const clients_portal = require("../src/ClientsPortal/clients.js");
const office_portal = require("../src/PereWorld/mainoffice")
 
main_app.use("/users", clients_portal);
main_app.use("/office", office_portal);

main_app.get("/", (service_requst, service_respond) => {
    service_respond.status(200).send("Welcome To Setkenya");
})

main_app.listen(app_port_details);

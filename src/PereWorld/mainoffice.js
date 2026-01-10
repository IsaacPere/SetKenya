const office_framework = require("express");
const office_router = office_framework.Router();

office_router.get("/",(ofice_service_request, office_service_respond) => {
    office_service_respond.send("Welcome Pere")
});

module.exports = office_router;
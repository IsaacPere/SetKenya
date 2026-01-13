const clients_payment_technologies = require("express");

const clients_payment_router = clients_payment_technologies.Router();

const {
  render_payment_page,
  starting_stk_push,
} = require("../backend/payment/paycontrol");

clients_payment_router.get("/stkpush", render_payment_page);
clients_payment_router.post("/stkpush", starting_stk_push);

module.exports = clients_payment_router;

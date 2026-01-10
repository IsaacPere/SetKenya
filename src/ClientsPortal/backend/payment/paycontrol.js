const axios = require("axios");

const {
  get_time_stamp,
  get_password,
  get_acess_token,
  formatted_phone_number,
} = require("../payment/payhere"); // ✅ FIXED PATH

const render_payment_page = (req, res) => {
  res.render("stkpush", {
    title: "MPesa STK Push",
  });
};

const starting_stk_push = async (req, res) => {
  try {
    const { phonenumber, amount } = req.body;

    if (!phonenumber || !amount) {
      return res.status(400).json({
        success: false,
        message: "Phone number and amount is required",
      });
    }

    const formattedPhone = formatted_phone_number(phonenumber);
    const accessToken = await get_acess_token();

    const payload = {
      BusinessShortCode: process.env.SAFARICOM_DARAJA_SHORT_CODE,
      Password: get_password(),
      Timestamp: get_time_stamp(),
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: formattedPhone,
      PartyB: process.env.SAFARICOM_DARAJA_SHORT_CODE,
      PhoneNumber: formattedPhone,
      CallBackURL: process.env.CALLBACK_URL_DETAILS,
      AccountReference: "Clients Payment",
      TransactionDesc: "Clients Payment",
    };

    const response = await axios.post(
      process.env.SAFARICOM_DARAJA_STK_PUSH_URL,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    return res.json({
      success: true,
      message: "STK Push started successfully",
      data: response.data,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to start stk push",
    });
  }
};

module.exports = {
  render_payment_page,
  starting_stk_push,
};

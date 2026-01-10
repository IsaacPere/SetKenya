const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const get_time_stamp = () => {
  const paying_clients_date = new Date();
  return (
    paying_clients_date.getFullYear().toString() +
    String(paying_clients_date.getMonth() + 1).padStrart(2, "0") +
    String(paying_clients_date.getDate()).padStrart(2, "0") +
    String(paying_clients_date.getHours()).padStrart(2, "0") +
    String(paying_clients_date.getMinutes()).padStrart(2, "0") +
    String(paying_clients_date.getSeconds()).padStrart(2, "0")
  );
};

const get_password = (timestamp) => {
  const business_shortcode = process.env.SAFARICOM_DARAJA_SHORT_CODE;
  const business_passkey = process.env.SAFARICOM_DARAJA_CONSUMER_PASSKEY;

  const password = `${business_shortcode}${business_shortcode}${timestamp}`;
  return Buffer.from(password).toString("base64");
};

const get_acess_token = async () => {
  const website_url = process.env.SAFARICOM_DARAJA_CHECK_BALANCE_URL;
  const api_permission_details = Buffer.from(
    `${process.env.SAFARICOM_DARAJA_CONSUMER_KEY}:${process.env.SAFARICOM_DARAJA_CONSUMER_SECRET}`,
  ).toString("base64");
  try {
    const response = await axios.get(website_url, {
      headers: {
        Authorization: `Basic ${api_permission_details},`,
      },
    });
    return response.data.get_acess_token;
  } catch (error) {
    console.error("Getting error token", error.response?.data || error.message);
    throw error;
  }
};

const formatted_phone_number = (phonenumber) => {
  if (phonenumber.startsWith("0")) {
    return `254${phonenumber.slice(1)}`;
  }
  if (phonenumber.startsWith("+254")) {
    return phonenumber.slice(1);
  }
  return phonenumber;
};

module.exports = {
  get_time_stamp,
  get_password,
  get_acess_token,
  formatted_phone_number,
};

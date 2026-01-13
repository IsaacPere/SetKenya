import bcrypt from "bcryptjs";
import { checking_username_information } from "../database/ClientsDatabaseLogic";

const login_details = async (login_details_request, login_details_respond) => {
  try {
    const { username, password } = login_details_request.body;
    const clients_user_details = await checking_username_information({
      username,
    });
    if (!clients_user_details) {
      return login_details_respond.render("login", {
        error: "Invalid username or password",
      });
    }
    const clients_matched_details = await bcrypt.compare(
      password,
      clients_user_details.password,
    );
    if (!clients_matched_details) {
      return login_details_respond.render("login", {
        error: "Invalid username or password",
      });
    }
    login_details_respond.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    login_details_respond
      .status(500)
      .render("login", { error: "Login falied " });
  }
};
module.exports = login_details;

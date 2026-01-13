import crypto from "crypto";

const forgot_password_details = async (
  forgot_password_request,
  forgot_password_respond,
) => {
  try {
    const { email } = forgot_password_request.body;

    const user_forgot_password = await User.findOne({ email });
    if (!user_forgot_password) {
      return forgot_password_respond.status(404).render("resetlogin", {
        message: "Type new password for the application",
      });
    }

    const reseting_password_reset_token = crypto
      .randomBytes(64)
      .toString("hex");

    user_forgot_password.resetPasswordToken = crypto
      .createHash("sha256")
      .update(reseting_password_reset_token)
      .digest("hex");
    user_forgot_password.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    await user_forgot_password.save();

    forgot_password_respond.render("resetlogin", {
      message: "Enter new password",
    });
  } catch (error) {
    forgot_password_respond.status(500).render("resetlogin", {
      error: "Something went wrong",
    });
  }
};

module.exports = forgot_password_details;

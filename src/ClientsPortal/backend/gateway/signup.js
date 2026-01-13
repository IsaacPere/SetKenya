import bcrypt from "bcryptjs";

const sign_up_details = async (
  registration_details_request,
  registration_details_respond,
) => {
  try {
    let { first_name, middle_name, surname, username, email, password } =
      registration_details_request.body;

    email = email.toLowerCase().trim();
    username = username.trim();

    const must_have_in_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!must_have_in_email.test(email)) {
      return registration_details_respond.render("signup", {
        error: "Invalid email format",
      });
    }

    const checking_username_details = await User.findOne({ username });
    if (checking_username_details) {
      return registration_details_respond.render("signup", {
        error: "Username already taken",
      });
    }
    const checking_email_details = await User.findOne({ email });
    if (checking_email_details) {
      return registration_details_respond.render("signup", {
        error: "Email has already taken",
      });
    }

    if (password.length < 10) {
      return registration_details_respond.render("signup", {
        error: "Password must be at leaast 10 characters",
      });
    }

    const hashed_password = await bcrypt.hash(password, 10);

    const new_clients_details = await User.create({
      first_name,
      middle_name,
      surname,
      email,
      username,
      password: hashed_password,
    });

    generateTokenAndSetCookie(
      new_clients_details._id,
      registration_details_respond,
    );
    registration_details_respond.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    registration_details_respond
      .status(500)
      .render("signup", { error: "Something went absolute wrong" });
  }
};

module.exports = sign_up_details;

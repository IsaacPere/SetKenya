const logout_from_application = (
  logout_service_request,
  logout_service_respond,
) => {
  try {
    logout_service_respond.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
      sameSite: "strict",
      secure: false,
    });
    logout_service_respond.redirect("/auth/login");
  } catch (error) {
    console.error("Logout error:", error.message);
    logout_service_respond.status(500).send("Logout Failed");
  }
};

module.exports = logout_from_application;

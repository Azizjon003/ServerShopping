const {
  signUp,
  login,
  updatePassword,
  protect,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

const Router = require("express").Router();
Router.route("/signup").post(signUp);
Router.route("/login").post(login);
Router.route("/updatepassword").post(updatePassword);
Router.route("/test").post(protect);
Router.route("/forgotpassword").post(forgotPassword);
Router.route("/resetpassword/:token").post(resetPassword);
module.exports = Router;

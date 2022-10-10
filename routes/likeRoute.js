const Router = require("express").Router();
const auth = require("../controllers/authController");
const {
  add,
  getAll,
  delete1,
  getOne,
  update,
} = require("../controllers/likeProduct");

Router.route("/").post(auth.protect, add).get(auth.protect, getAll);
Router.route("/:id").delete(delete1).get(getOne).patch(update);

module.exports = Router;

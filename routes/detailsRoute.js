const Router = require("express").Router();
const {
  add,
  getAll,
  delete1,
  getOne,
  update,
} = require("../controllers/productDetails");

Router.route("/").post(add).get(getAll);
Router.route("/:id").delete(delete1).get(getOne).patch(update);

module.exports = Router;

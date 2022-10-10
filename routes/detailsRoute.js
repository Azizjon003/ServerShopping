const Router = require("express").Router();
const {
  add,
  getAll,
  delete1,
  getOne,
  update,
} = require("../controllers/productDetails");
const { upload, images } = require("../utility/upload");

Router.route("/").post(images.array("images", 5), add).get(getAll);
Router.route("/:id").delete(delete1).get(getOne).patch(update);

module.exports = Router;

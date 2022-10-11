const Router = require("express").Router();
const {
  add,
  delete1,
  getOne,
  update,
  getAll,
} = require("../controllers/productController");

const { upload } = require("../utility/upload");

Router.route("/").post(upload.single("image_main"), add).get(getAll);
Router.route("/:id").delete(delete1).get(getOne).patch(update);

module.exports = Router;

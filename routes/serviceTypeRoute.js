const Router = require("express").Router();
const {
  add,
  getAll,
  delete1,
  getOne,
  update,
} = require("../controllers/serviceType");
const { upload } = require("../utility/upload");

Router.route("/").post(upload.single("photo"), add).get(getAll);
Router.route("/:id").get(getOne).patch(update).delete(delete1);

module.exports = Router;

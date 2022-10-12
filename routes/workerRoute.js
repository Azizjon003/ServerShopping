const Router = require("express").Router();
const {
  add,
  getAll,
  delete1,
  getOne,
  update,
} = require("../controllers/workerController");
const { upload } = require("../utility/upload");

// Router.route("/").post(upload.single("photo"), add).get(getAll);
Router.route("/").post(add).get(getAll);
Router.route("/:id").delete(delete1).get(getOne).patch(update);

module.exports = Router;

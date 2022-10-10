const router = require("express").Router();
const userController = require("../controllers/userController");
const { upload } = require("../utility/upload");

router
  .route("/")
  .post(upload.single("photo"), userController.add)
  .get(userController.getAll);
router
  .route("/:id")
  .patch(userController.update)
  .get(userController.getOne)
  .delete(userController.delete1);

module.exports = router;

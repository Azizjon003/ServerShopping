const router = require("express").Router();
const vacancyCategoryController = require("../controllers/vacancyCategoryController");

router
  .route("/")
  .post(vacancyCategoryController.add)
  .get(vacancyCategoryController.getAll);
router
  .route("/:id")
  .patch(vacancyCategoryController.update)
  .get(vacancyCategoryController.getOne)
  .delete(vacancyCategoryController.delete1);

module.exports = router;

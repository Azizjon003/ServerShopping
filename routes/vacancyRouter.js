const router = require("express").Router();
const vacancyController = require("../controllers/vacancyController");

router.route("/").get(vacancyController.getAll).post(vacancyController.add);
router
  .route("/:id")
  .get(vacancyController.getOne)
  .patch(vacancyController.update)
  .delete(vacancyController.delete1);

module.exports = router;

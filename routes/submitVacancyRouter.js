const router = require("express").Router();
const submitVacancyController = require("../controllers/submitVacancy");

router
  .route("/")
  .post(submitVacancyController.add)
  .get(submitVacancyController.getAll);
router
  .route("/:id")
  .delete(submitVacancyController.delete1)
  .get(submitVacancyController.getOne)
  .patch(submitVacancyController.update);

module.exports = router;

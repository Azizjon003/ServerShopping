const router = require("express").Router();
const reviewController = require("../controllers/reviewController");
const Auth = require("../controllers/authController");
router
  .route("/")
  .post(Auth.protect, reviewController.add)
  .get(reviewController.getAll);
router
  .route("/:id")
  .delete(reviewController.delete1)
  .get(reviewController.getOne);

module.exports = router;

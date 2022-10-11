const router = require("express").Router();
const locationController = require("../controllers/locationController");

const auth = require("../controllers/authController");

router.route("/").post(auth.protect, locationController.add);

router
  .route("/:id")
  .delete(locationController.delete1)
  .get(auth.protect, locationController.getOne)
  .patch(locationController.update);

module.exports = router;

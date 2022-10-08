const router = require("express").Router();
const locationController = require("../controllers/locationController");

router.route("/").post(locationController.add).get(locationController.getAll);
router
  .route("/:id")
  .delete(locationController.delete1)
  .get(locationController.getOne)
  .patch(locationController.update);

module.exports = router;

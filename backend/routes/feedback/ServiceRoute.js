const express = require("express");
const router = express.Router();
const serviceController = require("../../controllers/feedbackControllers/ServiceController");

router.get("/", serviceController.getAllServices);
router.get("/pages/", serviceController.getAllServicesStatus);
router.get("/:id", serviceController.getServiceById);
router.post("/", serviceController.createService);
router.put("/:id", serviceController.updateService);
router.delete("/:id", serviceController.deleteService);
router.get(
  "/customer/:customerId",
  serviceController.getServicesByCustomerId
);

module.exports = router;

const express = require("express");
const router = express.Router();
const webPageController = require("../../controllers/feedbackControllers/WebPageController");

router.get("/", webPageController.getAllWebPage);
router.get("/pages/", webPageController.getAllWebPageStatus);
router.get("/:id", webPageController.getWebPageById);
router.post("/", webPageController.createwebpage);
router.put("/:id", webPageController.updatewebpage);
router.delete("/:id", webPageController.deletewebpage);
router.get(
  "/customer/:customerId",
  webPageController.getwebpageByCustomerId
);


module.exports = router;

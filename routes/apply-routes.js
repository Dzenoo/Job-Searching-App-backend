const express = require("express");
const applyControllers = require("../controllers/apply-controllers");
const { check } = require("express-validator");

const router = express.Router();

router.post(
  "/:jobId/:seekerId/:employerId/apply",
  [
    check("name").not().isEmpty(),
    check("surname").not().isEmpty(),
    check("email").not().isEmpty(),
    check("phone").not().isEmpty(),
    check("cv").not().isEmpty(),
    check("country").not().isEmpty(),
  ],
  applyControllers.applyToJob
);

router.post("/:applicationId/updateStatus", applyControllers.updateStatus);

module.exports = router;

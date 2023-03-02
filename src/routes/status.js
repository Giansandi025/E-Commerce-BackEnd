const express = require("express");

const router = express.Router();
const { statusController } = require("../controller/status");

router.post("/add-status", statusController.insertStatus);
module.exports = router;

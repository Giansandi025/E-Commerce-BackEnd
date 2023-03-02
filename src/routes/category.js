const express = require("express");

const router = express.Router();
const { categoryController } = require("../controller/category");
const { protect } = require("../middleware/auth");
const upload = require("../middleware/upload");
const upuser = require("../middleware/upuser");

router
  .get("/", categoryController.getCategory)
  .get("/:id_category", protect, categoryController.getCategoryDetail)
  .post("/post-category", upuser, categoryController.insertCategory)
  .put("/edit/:id_category", upuser, categoryController.updateCategory)
  .delete("/delete/:id_category", protect, categoryController.deleteCategory);

module.exports = router;

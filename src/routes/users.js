const express = require("express");

const router = express.Router();
const { userController } = require("../controller/users");
const { validate } = require("../helpers/users");
const { protect } = require("../middleware/auth");
const upload = require("../middleware/upload");
const upuser = require("../middleware/upuser");

router.post("/register/:role_user", validate, userController.insertUsers);
router.post("/refresh", userController.refresh);
router.post("/login", userController.login);
router.post("/verif", userController.otp);
router.get("/profile", protect, userController.getUser);
router.put(
  "/edit-profile",
  protect,
  upload.single("photo_user"),
  userController.editProfile
);
router.put("/edit-photo", protect, upuser, userController.putPhoto);
router.put(
  "/edit-profile-seller",
  protect,
  upload.single("photo_user"),
  userController.editProfileSeller
);

module.exports = router;

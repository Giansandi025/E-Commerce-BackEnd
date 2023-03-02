const multer = require("multer");
const storage = require("../config/photo");

const upuser = multer({
  storage: storage,
}).fields([
  {
    name: "photo_user",
    maxCount: 1,
  },
  {
    name: "photo_product",
    maxCount: 1,
  },
  {
    name: "photo_category",
    maxCount: 1,
  },
]);

module.exports = upuser;

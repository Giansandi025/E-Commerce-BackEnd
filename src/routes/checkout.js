const express = require("express");

const router = express.Router();
const { checkoutController } = require("../controller/checkout");
const { protect } = require("../middleware/auth");

router
  .post("/post-checkout", protect, checkoutController.postCheckout)
  .get("/get-checkout", protect, checkoutController.getCheckout)
  .get(
    "/get-checkout-delivered",
    protect,
    checkoutController.getCheckoutDelivered
  )
  .get("/get-checkout-seller", protect, checkoutController.getCheckoutSeller)
  .get("/get-checkout-done", protect, checkoutController.getCheckoutDone)
  .get(
    "/get-checkout-detail/:id_checkout",
    protect,
    checkoutController.getCheckoutDetail
  )
  .put("/put-checkout-id/:id_checkout", checkoutController.putStatusId)
  .put("/put-checkout", protect, checkoutController.putStatus);

module.exports = router;

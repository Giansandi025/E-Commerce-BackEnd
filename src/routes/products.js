const express = require("express");

const router = express.Router();
const { productsController } = require("../controller/products");
// const { validateRole } = require("../helpers/role");
const { protect } = require("../middleware/auth");
const upload = require("../middleware/upload");
// const { hitCache, clearCache } = require("../middleware/redis");
const upuser = require("../middleware/upuser");

router
  .get("/", productsController.getProducts)
  .get("/detail/:id_product", productsController.getProductsDetail)
  .get("/category/:category_id", productsController.getProductsByCategory)
  .get(`/product-user`, protect, productsController.getProductUser)
  .get(`/product-archived`, protect, productsController.getProductArchived)
  .put(`/set-archived/:id_product`, productsController.setProductArchived)
  .put(`/set-activated/:id_product`, productsController.setProductActivated)
  .post(
    "/post-product",
    // validateRole,
    protect,
    upuser,
    productsController.insertProduct
  )
  .put(
    "/:id_product",
    protect,
    upuser,

    productsController.updateProduct
  )
  .delete(
    "/:id_product",
    // protect,

    productsController.deleteProduct
  );

module.exports = router;

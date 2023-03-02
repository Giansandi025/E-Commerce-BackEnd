const express = require("express");

const router = express.Router();
const { transactionController } = require("../controller/transaction");
const { protect } = require("../middleware/auth");

router
  .get("/get-transaction", protect, transactionController.getTransactionByUser)
  .get("/:id_transaction", protect, transactionController.getTransactionDetail)
  .post("/post-transaction/", protect, transactionController.insertTransaction)
  .put("/:id_transaction", protect, transactionController.updateTransaction)
  .delete(
    "/delete/:id_transaction",
    protect,
    transactionController.deleteTransaction
  );

module.exports = router;

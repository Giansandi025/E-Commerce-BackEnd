const modelTransaction = require("../model/transaction");
const { response } = require("../middleware/common");
const { resp } = require("../middleware/common");

const transactionController = {
  updateTransaction: (req, res) => {
    modelTransaction
      .updateTransaction(req.params.id_transaction, req.body)
      .then(() => resp(res, 200, true, "Update transaction success"))
      .catch((err) =>
        response(res, 404, false, err, "Update transaction failed")
      );
  },
  deleteTransaction: (req, res) => {
    modelTransaction
      .deleteTransaction(req.params.id_transaction)
      .then(() => resp(res, 200, true, "Delete transaction success"))
      .catch((err) =>
        response(res, 404, false, err, "Delete transaction failed")
      );
  },
  getTransactionByUser: async (req, res) => {
    try {
      const user_id = req.payload.id_user;
      console.log("id user", user_id);
      const result = await modelTransaction.selectTransactionByUser(user_id);
      response(res, 200, true, result.rows, "Get transaction success");
    } catch (err) {
      response(res, 404, false, err, "Get transaction fail");
    }
  },
  getTransactionDetail: (req, res) => {
    modelTransaction
      .selectDataTransactionbyId(req.params.id_transaction)
      .then((result) =>
        response(res, 200, true, result.rows, "Get detail transaction success")
      )
      .catch((err) =>
        response(res, 404, false, err, "Get detail transaction failed")
      );
  },
  insertTransaction: async (req, res) => {
    try {
      const user_id = req.payload.id_user;
      console.log("id user", user_id);

      req.body.status = parseInt(req.body.status);
      req.body.product_id = parseInt(req.body.product_id);
      req.body.qty_transaction = parseInt(req.body.qty_transaction);
      req.body.total_transaction = parseInt(req.body.total_transaction);
      await modelTransaction.insertTransaction(user_id, req.body);
      return response(res, 200, true, req.body, "Input transaction success");
    } catch (err) {
      console.log(err);
      return response(res, 404, false, err, "Input transaction fail");
    }
  },
};
exports.transactionController = transactionController;

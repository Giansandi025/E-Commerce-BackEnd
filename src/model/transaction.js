const Pool = require("../config/db");

const selectTransactionByUser = (user_id) =>
  Pool.query(
    `SELECT transaction.id_transaction,transaction.product_id,transaction.qty_transaction,transaction.total_transaction,transaction.user_id,transaction.seller_id,products.name_product,products.photo_product,products.brand_product,products.price_product FROM transaction INNER JOIN products ON transaction.product_id=products.id_product WHERE transaction.user_id='${user_id}' AND status=0`
  );

const selectDataTransactionbyId = (id) =>
  new Promise((resolve, reject) => {
    Pool.query(
      `select * from transaction where id_transaction = '${id}' `,
      (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      }
    );
  });

const insertTransaction = (user_id, dataTransaction) => {
  const { product_id, qty_transaction, total_transaction, seller_id, status } =
    dataTransaction;

  return Pool.query(
    `INSERT INTO transaction(product_id,qty_transaction,total_transaction,user_id,seller_id,status)VALUES(${product_id},${qty_transaction},${total_transaction},'${user_id}','${seller_id}',0)`
  );
};
const updateTransaction = (id_transaction, dataTransaction) => {
  const {
    email_transaction,
    product_id,
    amount_transaction,
    total_transaction,
  } = dataTransaction;
  return Pool.query(
    `UPDATE transaction SET email_transaction='${email_transaction}',product_id='${product_id}',amount_transaction='${amount_transaction}',total_transaction='${total_transaction}' WHERE id_transaction='${id_transaction}'`
  );
};

const deleteTransaction = (id_transaction) =>
  Pool.query(
    `DELETE FROM transaction where id_transaction='${id_transaction}'`
  );

module.exports = {
  selectTransactionByUser,
  selectDataTransactionbyId,
  insertTransaction,
  deleteTransaction,
  updateTransaction,
};

const Pool = require("../config/db");

const insertCheckout = (user_id, dataCheckout) => {
  const { transaction_id, seller_id, product_id } = dataCheckout;
  return Pool.query(
    `INSERT INTO checkout(transaction_id,user_id,seller_id,product_id,status_id)VALUES(${transaction_id},'${user_id}','${seller_id}',${product_id},0);
    UPDATE transaction SET status=1`
  );
};

const selectCheckout = (user_id, search) =>
  Pool.query(
    `SELECT checkout.*,transaction.qty_transaction,transaction.total_transaction,products.name_product,products.price_product,products.photo_product,status.name_status,users.fullname_user,users.address_user FROM checkout INNER JOIN transaction ON checkout.transaction_id=transaction.id_transaction INNER JOIN products ON checkout.product_id=products.id_product INNER JOIN status ON checkout.status_id=status.id_status INNER JOIN users ON checkout.user_id=users.id_user WHERE checkout.user_id='${user_id}' AND checkout.status_id=0 AND (name_product) ilike '%${search}%'`
  );

const selectCheckoutDone = (user_id, search) =>
  Pool.query(
    `SELECT checkout.*,transaction.qty_transaction,transaction.total_transaction,products.name_product,products.price_product,products.photo_product,status.name_status,users.fullname_user,users.address_user FROM checkout INNER JOIN transaction ON checkout.transaction_id=transaction.id_transaction INNER JOIN products ON checkout.product_id=products.id_product INNER JOIN status ON checkout.status_id=status.id_status INNER JOIN users ON checkout.user_id=users.id_user WHERE checkout.user_id='${user_id}' AND checkout.status_id=1 AND (name_product) ilike '%${search}%'`
  );

const selectCheckoutSeller = (user_id, search) =>
  Pool.query(
    `SELECT checkout.*,transaction.qty_transaction,transaction.total_transaction,products.name_product,products.price_product,status.name_status,users.fullname_user,users.address_user FROM checkout INNER JOIN transaction ON checkout.transaction_id=transaction.id_transaction INNER JOIN products ON checkout.product_id=products.id_product INNER JOIN status ON checkout.status_id=status.id_status INNER JOIN users ON checkout.user_id=users.id_user WHERE checkout.seller_id='${user_id}' AND checkout.status_id=0 AND (name_product) ilike '%${search}%'`
  );

const selectCheckoutDelivered = (user_id, search) =>
  Pool.query(
    `SELECT checkout.*,transaction.qty_transaction,transaction.total_transaction,products.name_product,products.price_product,status.name_status,users.fullname_user,users.address_user FROM checkout INNER JOIN transaction ON checkout.transaction_id=transaction.id_transaction INNER JOIN products ON checkout.product_id=products.id_product INNER JOIN status ON checkout.status_id=status.id_status INNER JOIN users ON checkout.user_id=users.id_user WHERE checkout.seller_id='${user_id}' AND checkout.status_id=1 AND (name_product) ilike '%${search}%'`
  );
const putStatusCheckout = (data) =>
  new Promise((resolve, reject) => {
    const { id_checkout } = data;
    Pool.query(
      `UPDATE checkout SET status_id=1 WHERE id_checkout=${id_checkout}`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });

const putStatusCheckoutId = (id_checkout) =>
  new Promise((resolve, reject) => {
    Pool.query(
      `UPDATE checkout SET status_id=1 WHERE id_checkout=${id_checkout}`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });

const selectDataCheckoutbyId = (id_checkout) =>
  new Promise((resolve, reject) => {
    Pool.query(
      `SELECT checkout.*,transaction.qty_transaction,transaction.total_transaction,products.name_product,products.price_product,products.photo_product,status.name_status,users.fullname_user,users.address_user FROM checkout INNER JOIN transaction ON checkout.transaction_id=transaction.id_transaction INNER JOIN products ON checkout.product_id=products.id_product INNER JOIN status ON checkout.status_id=status.id_status INNER JOIN users ON checkout.user_id=users.id_user WHERE checkout.id_checkout=${id_checkout} `,
      (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      }
    );
  });

module.exports = {
  insertCheckout,
  selectCheckout,
  selectCheckoutSeller,
  selectCheckoutDelivered,
  putStatusCheckout,
  selectCheckoutDone,
  selectDataCheckoutbyId,
  putStatusCheckoutId,
};

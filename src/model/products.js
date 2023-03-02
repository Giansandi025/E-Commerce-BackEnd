const Pool = require("../config/db");

const selectDataProduct = (page, limit, sort, sortby, search) =>
  new Promise((resolve, reject) => {
    const offset = (page - 1) * limit;
    Pool.query(
      `select products.id_product,products.name_product,products.stock_product,products.price_product,products.brand_product,products.description_product,category.name_category as category,products.photo_product
      FROM products
      INNER JOIN category
      ON products.category_id = category.id_category where (name_product) ilike '%${search}%' order by ${sortby} ${sort} limit ${limit} offset ${offset} `,
      (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      }
    );
  });

const selectDataProductbyId = (id) =>
  new Promise((resolve, reject) => {
    Pool.query(
      `select products.id_product,products.name_product,products.stock_product,products.price_product,products.brand_product,products.description_product,products.user_id,category.name_category as category,products.photo_product
      FROM products
      INNER JOIN category
      ON products.category_id = category.id_category where id_product = '${id}' `,
      (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      }
    );
  });
const selectDataProductbyCategory = (id) =>
  new Promise((resolve, reject) => {
    Pool.query(
      `select products.id_product,products.name_product,products.stock_product,products.price_product,products.brand_product,products.description_product,category.name_category as category,products.photo_product
      FROM products
      INNER JOIN category
      ON products.category_id = category.id_category where category_id = '${id}' AND archived=0 `,
      (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      }
    );
  });
const insertDataProduct = (user_id, dataProducts) => {
  const {
    name_product,
    stock_product,
    price_product,
    category_id,
    photo_product,
    brand_product,
    description_product,
    archived,
  } = dataProducts;

  return Pool.query(
    `INSERT INTO products(name_product, stock_product, price_product,category_id,photo_product,brand_product,description_product,user_id,archived)VALUES('${name_product}',${stock_product},${price_product},${category_id},'${photo_product}','${brand_product}','${description_product}','${user_id}',0)`
  );
};
const updateDataProduct = (id_product, dataProducts) => {
  const {
    name_product,
    stock_product,
    price_product,
    category_id,
    photo_product,
    brand_product,
    description_product,
  } = dataProducts;
  return Pool.query(
    `UPDATE products SET name_product='${name_product}',stock_product='${stock_product}',price_product='${price_product}',category_id='${category_id}',photo_product='${photo_product}',brand_product='${brand_product}',description_product='${description_product}' WHERE id_product='${id_product}'`
  );
};

const deleteDataProduct = (id_product) =>
  Pool.query(`DELETE FROM products where id_product='${id_product}'`);

const getProductByUser = (user_id, page, limit, sort, sortby, search) =>
  new Promise((resolve, reject) => {
    const offset = (page - 1) * limit;
    Pool.query(
      `select products.id_product,products.name_product,products.stock_product,products.price_product,products.brand_product,products.description_product,category.name_category as category,products.photo_product
      FROM products
      INNER JOIN category
      ON products.category_id = category.id_category WHERE user_id = '${user_id}'AND archived=0 AND (name_product) ilike '%${search}%' order by ${sortby} ${sort} limit ${limit} offset ${offset}`,
      (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      }
    );
  });

const getProductByArchived = (user_id, page, limit, sort, sortby, search) =>
  new Promise((resolve, reject) => {
    const offset = (page - 1) * limit;
    Pool.query(
      `select products.id_product,products.name_product,products.stock_product,products.price_product,products.brand_product,products.description_product,category.name_category as category,products.photo_product
      FROM products
      INNER JOIN category
      ON products.category_id = category.id_category WHERE user_id = '${user_id}' AND archived=1 AND (name_product) ilike '%${search}%' order by ${sortby} ${sort} limit ${limit} offset ${offset}`,
      (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      }
    );
  });
const archivedDataProduct = (id_product) =>
  Pool.query(`UPDATE products SET archived=1 where id_product='${id_product}'`);

const activatedDataProduct = (id_product) =>
  Pool.query(`UPDATE products SET archived=0 where id_product='${id_product}'`);
module.exports = {
  selectDataProduct,
  selectDataProductbyId,
  insertDataProduct,
  deleteDataProduct,
  updateDataProduct,
  selectDataProductbyCategory,
  getProductByUser,
  getProductByArchived,
  archivedDataProduct,
  activatedDataProduct,
};

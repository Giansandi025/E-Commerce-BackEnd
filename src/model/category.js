const Pool = require("../config/db");

const selectCategory = () => Pool.query("SELECT * FROM category");

const selectDataCategorybyId = (id) =>
  new Promise((resolve, reject) => {
    Pool.query(
      `select * from category where id_category = '${id}' `,
      (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      }
    );
  });

const insertCategory = (dataCategory) => {
  const { name_category, photo_category } = dataCategory;

  return Pool.query(
    `INSERT INTO category(name_category,photo_category)VALUES('${name_category}','${photo_category}')`
  );
};
const updateCategory = (id_category, dataCategory) => {
  const { name_category, photo_category } = dataCategory;
  return Pool.query(
    `UPDATE category SET name_category='${name_category}',photo_category='${photo_category}' WHERE id_category='${id_category}'`
  );
};

const deleteCategory = (id_category) =>
  Pool.query(`DELETE FROM category where id_category='${id_category}'`);

module.exports = {
  selectCategory,
  selectDataCategorybyId,
  insertCategory,
  deleteCategory,
  updateCategory,
};

// const { createClient } = require("redis");
const modelProduct = require("../model/products");
const { response } = require("../middleware/common");
const { resp } = require("../middleware/common");

const productsController = {
  updateProduct: async (req, res) => {
    try {
      req.body.stock_product = parseInt(req.body.stock_product);
      req.body.price_product = parseInt(req.body.price_product);
      req.body.category_id = parseInt(req.body.category_id);
      const {
        photo_product: [photo_product],
      } = req.files;
      req.body.photo_product = photo_product.path;
      await modelProduct.updateDataProduct(req.params.id_product, req.body);
      return response(res, 200, true, req.body, "Input Data Success");
    } catch (err) {
      console.log(err);
      return response(res, 404, false, err, "Input Data Fail");
    }
  },
  deleteProduct: (req, res) => {
    modelProduct
      .deleteDataProduct(req.params.id_product)
      .then(() => resp(res, 200, true, "Delete product success"))
      .catch((err) => response(res, 404, false, err, "Delete product failed"));
  },
  getProducts: (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const sort = req.query.sort || "asc";
    const sortby = req.query.sortby || "id_product";
    const search = req.query.search || "";
    modelProduct
      .selectDataProduct(page, limit, sort, sortby, search)
      .then((result) =>
        response(res, 200, true, result.rows, "Get product success")
      )
      .catch((err) => response(res, 404, false, err, "Get product failed"));
  },
  getProductsDetail: async (req, res) => {
    try {
      const result = await modelProduct.selectDataProductbyId(
        req.params.id_product
      );
      response(res, 200, true, result.rows, "get product success");
    } catch (error) {
      console.log(error);
      response(res, 404, false, "get product failed");
    }
  },
  getProductsByCategory: async (req, res) => {
    try {
      const result = await modelProduct.selectDataProductbyCategory(
        req.params.category_id
      );
      response(res, 200, true, result.rows, "get product by category success");
    } catch (error) {
      console.log(error);
      response(res, 404, false, "get product by category failed");
    }
  },
  insertProduct: async (req, res) => {
    try {
      const user_id = req.payload.id_user;
      console.log("id_user", user_id);

      req.body.stock_product = parseInt(req.body.stock_product);
      req.body.price_product = parseInt(req.body.price_product);
      req.body.category_id = parseInt(req.body.category_id);
      const {
        photo_product: [photo_product],
      } = req.files;
      req.body.photo_product = photo_product.path;
      await modelProduct.insertDataProduct(user_id, req.body);
      return response(res, 200, true, req.body, "Input Data Success");
    } catch (err) {
      console.log(err);
      return response(res, 404, false, err, "Input Data Fail");
    }
  },
  getProductUser: async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const sort = req.query.sort || "asc";
    const sortby = req.query.sortby || "id_product";
    const search = req.query.search || "";
    try {
      const user_id = req.payload.id_user;
      console.log("id_user", user_id);
      const result = await modelProduct.getProductByUser(
        user_id,
        page,
        limit,
        sort,
        sortby,
        search
      );

      response(res, 200, true, result.rows, "Success Get Product By user");
    } catch (error) {
      response(res, 400, false, error, "Get Product By User Failed");
    }
  },
  getProductArchived: async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const sort = req.query.sort || "asc";
    const sortby = req.query.sortby || "id_product";
    const search = req.query.search || "";
    try {
      const user_id = req.payload.id_user;
      console.log("id_user", user_id);
      const result = await modelProduct.getProductByArchived(
        user_id,
        page,
        limit,
        sort,
        sortby,
        search
      );
      response(res, 200, true, result.rows, "Success Get Product By user");
    } catch (error) {
      response(res, 400, false, error, "Get Product By User Failed");
    }
  },
  setProductArchived: (req, res) => {
    modelProduct
      .archivedDataProduct(req.params.id_product)
      .then(() => resp(res, 200, true, "Archived product success"))
      .catch((err) =>
        response(res, 404, false, err, "Archived product failed")
      );
  },
  setProductActivated: (req, res) => {
    modelProduct
      .activatedDataProduct(req.params.id_product)
      .then(() => resp(res, 200, true, "Archived product success"))
      .catch((err) =>
        response(res, 404, false, err, "Archived product failed")
      );
  },
};
exports.productsController = productsController;

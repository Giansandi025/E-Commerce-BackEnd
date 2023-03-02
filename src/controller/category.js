const modelCategory = require("../model/category");
const { response } = require("../middleware/common");
const { resp } = require("../middleware/common");

const categoryController = {
  updateCategory: async (req, res) => {
    try {
      const {
        photo_category: [photo_category],
      } = req.files;
      req.body.photo_category = photo_category.path;
      await modelCategory.updateCategory(req.params.id_category, req.body);
      return response(res, 200, true, req.body, "Input Data Success");
    } catch (err) {
      console.log(err);
      return response(res, 404, false, err, "Input Data Fail");
    }
  },
  deleteCategory: (req, res) => {
    modelCategory
      .deleteCategory(req.params.id_category)
      .then(() => resp(res, 200, true, "Delete category success"))
      .catch((err) => response(res, 404, false, err, "Delete category failed"));
  },
  getCategory: (_req, res) => {
    modelCategory
      .selectCategory()
      .then((result) =>
        response(res, 200, true, result.rows, "Get category success")
      )
      .catch((err) => response(res, 404, false, err, "Get category failed"));
  },
  getCategoryDetail: (req, res) => {
    modelCategory
      .selectDataCategorybyId(req.params.id_category)
      .then((result) =>
        response(res, 200, true, result.rows, "Get detail category success")
      )
      .catch((err) =>
        response(res, 404, false, err, "Get detail category failed")
      );
  },
  insertCategory: async (req, res) => {
    try {
      const {
        photo_category: [photo_category],
      } = req.files;
      req.body.photo_category = photo_category.path;
      await modelCategory.insertCategory(req.body);
      return response(res, 200, true, req.body, "Input Data Success");
    } catch (err) {
      console.log(err);
      return response(res, 404, false, err, "Input Data Fail");
    }
  },
};
exports.categoryController = categoryController;

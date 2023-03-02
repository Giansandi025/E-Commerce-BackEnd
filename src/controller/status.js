const modelStatus = require("../model/status");
const { response, resp } = require("../middleware/common");

const statusController = {
  insertStatus: async (req, res) => {
    modelStatus
      .postStatus(req.body)
      .then(() => resp(res, 200, true, "Insert status success"))
      .catch((err) => response(res, 404, false, err, "Insert status fail"));
  },
};

exports.statusController = statusController;

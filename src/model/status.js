const Pool = require("../config/db");

const postStatus = (dataStatus) => {
  const { id_status, name_status } = dataStatus;
  return Pool.query(
    `INSERT INTO status(id_status,name_status)VALUES(${id_status},'${name_status}')`
  );
};

module.exports = {
  postStatus,
};

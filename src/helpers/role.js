const validateRole = (req, res, next) => {
  const { role_user } = req.params;
  const err = [];
  try {
    if (role_user === "custommer") err.push("cust");
    if (err.length > 0) {
      throw new Error(err.toString());
    }

    next();
  } catch (err) {
    console.log(err);
    res.json({ error: `${err}` });
  }
};
module.exports = { validateRole };

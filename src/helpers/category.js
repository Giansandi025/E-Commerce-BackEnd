const validate = (req, res, next) => {
  const { name_category } = req.body;
  const err = [];
  try {
    if (!name_category || !isNaN(name_category) || name_category.length < 3)
      err.push("name must more than 3 character");
    if (err.length > 0) {
      throw new Error(err.toString());
    }

    next();
  } catch (err) {
    console.log(err);
    res.json({ error: `${err}` });
  }
};
module.exports = { validate };

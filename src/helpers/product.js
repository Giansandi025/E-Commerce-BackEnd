const validate = (req, res, next) => {
  const { name_product, stock_product, price_product, category_id } = req.body;
  const err = [];
  try {
    if (!name_product || !isNaN(name_product) || name_product.length < 4)
      err.push("name must more than 4 character");
    if (!stock_product || isNaN(stock_product))
      err.push("stock must be number and not 0");
    if (!price_product || isNaN(price_product))
      err.push("price must be number and not 0");
    if (!category_id || isNaN(category_id))
      err.push("category must be number and not 0");
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

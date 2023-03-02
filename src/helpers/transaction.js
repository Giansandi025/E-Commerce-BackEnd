const validate = (req, res, next) => {
  const {
    email_transaction,
    product_id,
    amount_transaction,
    total_transaction,
  } = req.body;
  const err = [];
  try {
    if (
      !email_transaction ||
      !isNaN(email_transaction) ||
      email_transaction.length < 3
    )
      err.push("email must more than 3 character");
    if (!product_id || isNaN(product_id))
      err.push("product id must be number and not 0");
    if (!amount_transaction || isNaN(amount_transaction))
      err.push("amount must be number and not 0");
    if (!total_transaction || isNaN(total_transaction))
      err.push("stock must be number and not 0");
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

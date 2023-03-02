const { createClient } = require("redis");

const client = createClient(6379);

client.on("error", (err) => console.log("Redis Client Error", err));

client.connect();
const { response } = require("./common");

const hitCache = async (req, res, next) => {
  const id_product = req.params.id_product;
  const product = await client.get(`product/${id_product}`);
  console.log(product);
  if (product) {
    return response(
      res,
      200,
      true,
      JSON.parse(product),
      "Get product from redis"
    );
  }
  next();
};

const clearCache = async (req, res, next) => {
  const id_product = req.params.id_product;
  client.del(`product/${id_product}`);
  next();
};

module.exports = { hitCache, clearCache };

const products = require("../products");

// ---------------- Get All Products Available ----------------------------
const getAllProducts = (req, res) => {
  const allowedQueries = ["name", "limit"];
  const queryKeys = Object.keys(req.query);

  const invalidQueries = queryKeys.filter(
    (key) => !allowedQueries.includes(key)
  );
  if (invalidQueries.length > 0) {
    const response = {
      success: false,
      message: `Invalid query parameter(s): ${invalidQueries.join(", ")}`,
      allowedParams: allowedQueries,
    };
    return res.status(400).send(response);
  }
  const { name, limit } = req.query;
  let filteredProduct = products;

  if (name) {
    filteredProduct = products.filter((product) => {
      const productName = product.name.toLowerCase();
      const queryName = name.toLowerCase();
      return productName.includes(queryName);
      // return product.name.includes(name)
    });
    // console.log(filteredProduct, "name");
  }

  if (limit) {
    filteredProduct = filteredProduct.slice(0, parseInt(limit));
    // console.log(filteredProduct, "limit");.
  }

  const response = {
    success: true,
    message:
      filteredProduct.length <= 1
        ? "Product Fetch Successful"
        : "Products Fetch Successful",
    [filteredProduct.length <= 1 ? "totalProduct" : "totalProducts"]:
      filteredProduct.length,
    data: {
      [filteredProduct.length <= 1 ? "product" : "products"]: filteredProduct,
    },
  };
  return res.status(200).send(response);
};

// ---------------- Get A Single Product ----------------------------

const getProductById = (req, res) => {
  const productId = req.params.id;

  const product = products.find(
    (product) => product.id === parseInt(productId)
  );

  const response = {
    success: true,
    message: "Product Fetch Successful",
    data: { product },
  };
  res.status(200).send(response);
};

// ---------------- Create Product ----------------------------
const createProduct = (req, res) => {
  const data = req.body;
  const { name } = data;
  const productExists = products.find((product) => product.name === name);

  if (productExists) {
    const response = {
      success: false,
      message: `Product < ${name} > Already Exists`,
    };

    return res.status(409).send(response);
  }
  const newProduct = {
    id: products.length + 1,
    ...data,
  };

  products.push(newProduct);
  const response = {
    success: true,
    message: "Product Created Successfully",
    data: { product: newProduct },
  };

  res.status(201).send(response);
};

// ---------------- Update Product----------------------------
const updateProduct = (req, res) => {
  const productId = parseInt(req.params.id);
  const update = req.body;
  const { name } = update;
  const productExists = products.find((product) => product.id === productId);

  if (!productExists) {
    const response = {
      success: false,
      message: `No Product Found For < ${name} >`,
    };

    return res.status(404).send(response);
  }

  const updatedProduct = {
    ...productExists,
    ...update,
  };

  const productIndex = products.findIndex(
    (product) => product.id === productExists.id
  );
  products[productIndex] = updatedProduct;
  const response = {
    success: true,
    message: `Product < ${name} > Updated Successfully`,
    data: { product: updatedProduct },
  };

  res.status(200).send(response);
};

// ------------------PATCH--------------------------------
const partialUpdate = (req, res) => {
  const productId = parseInt(req.params.id);
  const updateBody = req.body;

  const productExists = products.find((product) => product.id === productId);
  if (!productExists) {
    const response = {
      success: false,
      message: `Product Not Found For < ${req.body.name} >`,
    };
    return res.status(404).send(response);
  }

  let updatedProduct = {};

  //Object--->> Array --->forEachArray
  Object.keys(updateBody).forEach((key) => {
    //Check to see which key-value pairs where updated
    if (productExists.hasOwnProperty(key)) {
      //Object property-key = request body property-key
      productExists[key] = updateBody[key];
      //Add key-value pairs that pass condition to new object (updatedProduct)
      updatedProduct[key] = productExists[key];
    }
  });
  // console.log(updatedProduct);

  const response = {
    success: true,
    message: "Product updated successfully",
    data: {
      "updatedKeyValuePair(s)": updatedProduct,
      product: productExists,
    },
  };

  res.status(200).send(response);
};
// ---------------- Delete Product ----------------------------
const deleteProduct = (req, res) => {
  const productId = req.params.id;
  const productExists = products.find(
    (product) => product.id === parseInt(productId)
  );

  if (!productExists) {
    const response = {
      success: false,
      message: `No Product Found`,
    };

    return res.status(404).send(response);
  }

  //find and delete
  const productIndex = products.findIndex(
    (product) => product.id === productExists.id
  );
  products.splice(productIndex, 1);

  const response = {
    success: true,
    message: `Product < ${productExists.name} > Deleted Successfully`,
  };

  res.status(200).send(response);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  partialUpdate,
  deleteProduct,
};

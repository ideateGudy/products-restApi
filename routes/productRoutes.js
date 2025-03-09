const express = require("express");
const router = express.Router();

const productController = require("../controllers/productContoller");

router.get("/products", productController.getAllProducts);
// router.get("/products/?name", productController.searchProduct);
router.get("/product/:id", productController.getProductById);
router.post("/product", productController.createProduct);
router.put("/product/:id", productController.updateProduct);
router.delete("/product/:id", productController.deleteProduct);

module.exports = router;

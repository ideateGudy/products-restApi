const express = require("express");
const router = express.Router();

const productController = require("../controllers/productContoller");

router.get(["/products", "/"], productController.getAllProducts);
router.get("/product/:id", productController.getProductById);
router.post("/product", productController.createProduct);
router.put("/product/:id", productController.updateProduct);
router.patch("/product/:id", productController.partialUpdate);
router.delete("/product/:id", productController.deleteProduct);

module.exports = router;

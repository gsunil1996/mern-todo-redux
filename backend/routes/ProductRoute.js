const { Router } = require("express");

const { getProducts, getProductById, saveProducts, updateProducts, deleteProductstesting } = require("../controllers/ProductController");

const router = Router();

router.get("/getProducts", getProducts);

router.get("/getProducts/:id", getProductById);

router.post("/saveProducts", saveProducts);

router.patch("/updateProducts", updateProducts);

router.delete("/deleteproduct/:id", deleteProductstesting);

module.exports = router;
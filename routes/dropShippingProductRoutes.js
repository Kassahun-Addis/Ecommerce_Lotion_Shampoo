import express from "express";
import {
  brainTreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  realtedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/dropShippingProductController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
  "/createProduct",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
//routes
router.put(
  "/update_product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get products
router.get("/getProduct", getProductController);

//single product
router.get("/getProduct/:slug", getSingleProductController);

//get photo
router.get("/productPhoto/:pid", productPhotoController);

//delete rproduct
router.delete("/deleteProduct/:pid", deleteProductController);

//filter product
router.post("/productFilters", productFiltersController);

//product count
router.get("/productCount", productCountController);

//product per page
router.get("/productList/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/relatedProduct/:pid/:cid", realtedProductController);

//category wise product
router.get("/productCategory/:slug", productCategoryController);

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

export default router;

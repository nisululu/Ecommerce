const express = require('express')
const { createProduct, getProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteProductReview, getAdminProducts } = require('../controller/productController')
const { isAuthenticatedUser, authorization } = require('../middleware/authentication')

const router = express.Router()

//Create Product Route
router.route("/admin/product/create").post(isAuthenticatedUser, authorization("admin"), createProduct)

//Get All Product Route
router.route("/products").get(getProduct)

//Get All  Product Route -- Admin
router.route("/admin/products").get(isAuthenticatedUser, authorization("admin"),getAdminProducts)

//Update,Delete and View Product Route
router.route("/admin/product/:id")
    .put(isAuthenticatedUser, authorization("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorization("admin"), deleteProduct)

router.route("/product/:id").get(getProductDetails)

router.route("/review").put(isAuthenticatedUser, createProductReview)

router.route("/reviews")
    .get(getProductReviews)
    .delete(isAuthenticatedUser, deleteProductReview)

module.exports = router

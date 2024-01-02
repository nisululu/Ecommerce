const express = require('express')
const { newOrder, getSingleOrder, myOrders, getOrders, updateOrder, deleteOrder } = require('../controller/orderController')
const { isAuthenticatedUser, authorization } = require('../middleware/authentication')
const router = express.Router()

router.route("/order/new").post(isAuthenticatedUser, newOrder)

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder)

router.route("/orders/me").get(isAuthenticatedUser, myOrders)

router.route("/admin/orders").get(isAuthenticatedUser, authorization("admin"), getOrders)

router.route("/admin/order/:id").put(isAuthenticatedUser, authorization("admin"), updateOrder).delete(isAuthenticatedUser, authorization("admin"), deleteOrder)

module.exports = router
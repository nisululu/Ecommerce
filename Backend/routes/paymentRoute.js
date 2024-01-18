const express = require("express")
const router = express.Router()
const { isAuthenticatedUser } = require('../middleware/authentication')
const { processPayment, stripeApiKey } = require("../controller/paymentController")

router.route("/process/payment").post(isAuthenticatedUser, processPayment)
router.route("/stripeapikey").get(stripeApiKey)

module.exports = router
const express = require('express')
const { registerUser, loginUser, logoutUser, forgetPassword, getUserDetails, updateProfile, getAllUsers, getUser, updateUserRole, deleteUser, resetPassword, updatePassword } = require('../controller/userController')
const { isAuthenticatedUser, authorization } = require('../middleware/authentication')
const router = express.Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/password/forget").post(forgetPassword)
router.route("/password/reset/:token").put(resetPassword)
router.route("/password/update").put(isAuthenticatedUser, updatePassword)

router.route("/logout").get(logoutUser)

router.route("/me").get(isAuthenticatedUser, getUserDetails)

router.route("/me/update").put(isAuthenticatedUser, updateProfile)

router.route("/admin/users").get(isAuthenticatedUser, authorization("admin"), getAllUsers)

router.route("/admin/user/:id")
    .get(isAuthenticatedUser, authorization("admin"), getUser)
    .put(isAuthenticatedUser, authorization("admin"), updateUserRole)
    .delete(isAuthenticatedUser, authorization("admin"), deleteUser)

module.exports = router
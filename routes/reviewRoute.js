const express = require("express")
const router = new express.Router()
const reviewController = require("../controllers/reviewController")
const { validateReview } = require("../utilities/review-validation")
const utilities = require("../utilities/")

router.post(
  "/add",
  utilities.checkLogin,  // Only logged-in users
  validateReview,
  reviewController.addReview
)

module.exports = router

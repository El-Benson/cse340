const reviewModel = require("../models/review-model")
const invModel = require("../models/inventory-model")
const { validationResult } = require("express-validator")

// Display vehicle with reviews
async function buildVehicleDetail(req, res, next) {
  try {
    const inv_id = parseInt(req.params.inv_id)
    const vehicle = await invModel.getVehicleById(inv_id)
    const reviews = await reviewModel.getReviewsByVehicle(inv_id)

    res.render("inventory/detail", {
      title: `${vehicle.inv_make} ${vehicle.inv_model}`,
      vehicle,
      reviews,
      errors: null,
    })
  } catch (err) {
    next(err)
  }
}

// Handle review submission
async function addReview(req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    req.flash("notice", "Please correct the form errors.")
    return res.redirect("back")
  }

  try {
    const { review_text, inv_id, account_id } = req.body
    await reviewModel.addReview(review_text, inv_id, account_id)
    req.flash("notice", "Review added successfully!")
    res.redirect(`/inv/detail/${inv_id}`)
  } catch (err) {
    console.error("Error adding review:", err)
    req.flash("notice", "Error saving review.")
    res.redirect("back")
  }
}

module.exports = { buildVehicleDetail, addReview }

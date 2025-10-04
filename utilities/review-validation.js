const { body } = require("express-validator")

const validateReview = [
  body("review_text")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Review must be at least 5 characters long."),
]

module.exports = { validateReview }

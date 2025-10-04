// **********************************************
// * Inventory Validation
// * WDD340 - Week 5
// **********************************************

const { body, validationResult } = require("express-validator");
const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

// ============ ADD CLASSIFICATION VALIDATION ============

// Validation rules for adding a classification
const classificationRules = () => {
  return [
    body("classification_name")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Please provide a classification name of at least 3 characters.")
      .matches(/^[A-Za-z0-9\s]+$/)
      .withMessage("Classification name must contain only letters and numbers."),
  ];
};

// ============ ADD VEHICLE VALIDATION ============

// Validation rules for adding a new vehicle
const vehicleRules = () => {
  return [
    body("inv_make")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Please provide a make of at least 3 characters."),
    body("inv_model")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Please provide a model of at least 3 characters."),
    body("inv_year")
      .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
      .withMessage("Please enter a valid year."),
    body("inv_description")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Please provide a description of at least 5 characters."),
    body("inv_image")
      .trim()
      .notEmpty()
      .withMessage("Please provide an image path (e.g., /images/vehicles/car.jpg)."),
    body("inv_thumbnail")
      .trim()
      .notEmpty()
      .withMessage("Please provide a thumbnail path (e.g., /images/vehicles/car-tn.jpg)."),
    body("inv_price")
      .isFloat({ min: 0 })
      .withMessage("Please enter a valid price (number)."),
    body("inv_miles")
      .isInt({ min: 0 })
      .withMessage("Please enter valid mileage (number)."),
    body("inv_color")
      .trim()
      .notEmpty()
      .withMessage("Please provide a color."),
    body("classification_id")
      .isInt({ min: 1 })
      .withMessage("Please select a valid classification."),
  ];
};

// ============ VALIDATION CHECK FUNCTIONS ============

// Check classification data
const checkClassificationData = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const nav = await utilities.getNav();
    res.render("inventory/add-classification", {
      title: "Add New Classification",
      nav,
      errors: errors.array(),
    });
    return;
  }
  next();
};

// Check vehicle data
const checkVehicleData = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const nav = await utilities.getNav();
    const classificationSelect = await utilities.buildClassificationList(req.body.classification_id);

    res.render("inventory/add-inventory", {
      title: "Add New Vehicle",
      nav,
      classificationSelect,
      errors: errors.array(),
      inv_make: req.body.inv_make,
      inv_model: req.body.inv_model,
      inv_year: req.body.inv_year,
      inv_description: req.body.inv_description,
      inv_image: req.body.inv_image,
      inv_thumbnail: req.body.inv_thumbnail,
      inv_price: req.body.inv_price,
      inv_miles: req.body.inv_miles,
      inv_color: req.body.inv_color,
      classification_id: req.body.classification_id,
    });
    return;
  }
  next();
};

// ============ EXPORTS ============

module.exports = {
  classificationRules,
  checkClassificationData,
  vehicleRules,
  checkVehicleData,
};

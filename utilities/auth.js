// **********************************************
// * Authentication & Authorization Middleware
// * WDD340 - Week 5 Account Management
// **********************************************

const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * =============================================
 * Verify a valid JWT for logged-in users
 * =============================================
 */
const checkJWTToken = (req, res, next) => {
  if (req.cookies.jwt) {
    // Verify token from cookies
    jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        // Invalid or expired token
        req.flash("notice", "Please log in.");
        res.clearCookie("jwt");
        return res.redirect("/account/login");
      }
      // Store decoded info in locals
      res.locals.accountData = decoded;
      res.locals.loggedin = true;
      next();
    });
  } else {
    // No token found
    res.locals.accountData = null;
    res.locals.loggedin = false;
    next();
  }
};

/**
 * =============================================
 * Require login to access certain routes
 * =============================================
 */
const checkLogin = (req, res, next) => {
  if (res.locals.loggedin) {
    next();
  } else {
    req.flash("notice", "You must be logged in to view this page.");
    return res.redirect("/account/login");
  }
};

/**
 * =============================================
 * Restrict access to Employee/Admin accounts
 * =============================================
 */
const checkEmployee = (req, res, next) => {
  const account = res.locals.accountData;
  if (account && (account.account_type === "Employee" || account.account_type === "Admin")) {
    next();
  } else {
    req.flash("notice", "Access denied. Employees or Admins only.");
    return res.redirect("/account/login");
  }
};

/**
 * =============================================
 * Restrict access to Admin accounts only
 * (optional, if needed later)
 * =============================================
 */
const checkAdmin = (req, res, next) => {
  const account = res.locals.accountData;
  if (account && account.account_type === "Admin") {
    next();
  } else {
    req.flash("notice", "Access denied. Admins only.");
    return res.redirect("/account/login");
  }
};

/**
 * =============================================
 * Clear JWT on logout
 * =============================================
 */
const logout = (req, res) => {
  res.clearCookie("jwt");
  req.flash("notice", "You have successfully logged out.");
  return res.redirect("/");
};

// =============================================
// EXPORTS
// =============================================
module.exports = {
  checkJWTToken,
  checkLogin,
  checkEmployee,
  checkAdmin,
  logout,
};

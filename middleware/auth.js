const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  checkJWTToken: (req, res, next) => {
    if (req.cookies.jwt) {
      jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN_SECRET, (err, accountData) => {
        if (err) {
          res.clearCookie("jwt");
          return res.redirect("/account/login");
        }
        res.locals.accountData = accountData;
        res.locals.loggedin = true;
        next();
      });
    } else {
      res.locals.loggedin = false;
      next();
    }
  },

  checkLogin: (req, res, next) => {
    if (res.locals.loggedin) {
      next();
    } else {
      req.flash("notice", "Please log in to continue.");
      return res.redirect("/account/login");
    }
  },

  checkAdmin: (req, res, next) => {
    const { account_type } = res.locals.accountData || {};
    if (account_type === "Employee" || account_type === "Admin") {
      next();
    } else {
      req.flash("notice", "Access denied. Admins only.");
      return res.redirect("/account/login");
    }
  },
};

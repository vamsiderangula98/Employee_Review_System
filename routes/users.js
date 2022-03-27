const express = require("express");
const passport = require("passport");
const router = express.Router();
const userController = require("../controller/userController");

//login route
router.get("/login", userController.logIn);

//signup route
router.get("/signup", userController.signUp);

//creating new user
router.post("/createuser", userController.createUser);

//signOut the user
router.get("/sign-out", passport.checkAuthentication, userController.signout);

//login page render route
router.get("/login_page", userController.signInPage);

//creating session route
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/login" }),
  userController.createSession
);

module.exports = router;

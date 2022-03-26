const express=require("express");
const passport = require("passport");
const router=express.Router();

const reviewController=require('../controller/reviewController');

//submiting review route
router.post('/create_review/:id',passport.checkAuthentication,reviewController.createReview);

module.exports=router;
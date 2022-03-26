const express=require("express");
const passport = require("passport");
const router=express.Router();

const adminController=require('../controller/adminController');

//assigning work route
router.get('/assignworks',passport.checkAuthentication,adminController.admin);

//employee task route
router.post('/employee-task',passport.checkAuthentication,adminController.assignWork);

//view all employees route
router.get('/view_employees',passport.checkAuthentication,adminController.allEmplyees);

//delete an employee route
router.get('/delete_employee/:id',passport.checkAuthentication,adminController.deleteEmployee);

//making user as admin route
router.post('/make_admin',passport.checkAuthentication,adminController.makeAdmin);

module.exports=router;
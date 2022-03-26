const passport = require("passport");
const router=express.Router();
const userController=require('../controller/userController');

//route for home
router.get('/',passport.checkAuthentication,userController.home);

//route for users
router.use('/users',require('./users'));

//route for admin
router.use('/admin',require('./admin'));

//route for review
router.use('/review',require('./review'));

module.exports=router;
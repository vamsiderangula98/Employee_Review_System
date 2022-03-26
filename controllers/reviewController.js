const User=require('../models/user');
const Review=require('../models/review');

//creating a review from reviewer for recipient
module.exports.createReview= async function(req,res){
  try {
    if(!req.isAuthenticated){
        return res.redirect('/');
    }
    
    let recipient= await User.findById(req.params.id);  
    let reviewer=req.user;
    let review=req.body.newReview;
    await Review.create({
        review,
        from:reviewer,
        for:recipient
    })
    const index=req.user.for.indexOf(req.params.id);
    req.user.for.splice(index,1);
    req.user.save();
    return res.redirect('/');
      
  } catch (error) {
      console.log(error);
      return res.redirect('back')
  }


}
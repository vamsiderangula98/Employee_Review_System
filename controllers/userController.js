module.exports.home=async function(req,res){
    try {
      if(!req.user){
          return res.redirect('users/login')
       }
       let user=await User.findById(req.user._id);
       let recipients=[];
       for(let i=0 ;i<user.for.length;i++){
           let temp= await User.findById(user.for[i]);
           recipients.push(temp);
       }
       let review = await Review.find({
           for: req.user._id,
         });
  
       let recieved=[];
       for(let i=0;i<review.length;i++){
           let temp= await User.findById(review[i].from);
           
           let temp2={
               name:temp.name,
               review:review[i].review,
               updatedAt:review[i].updatedAt
           };
        
           recieved.push(temp2);
       }
      
       return res.render('home',{
           recipients,
           recieved
       });
    } catch (error) {
        console.log(error)
        return res.redirect('/')
    }
  }
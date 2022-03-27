const User=require('../models/user');
const review=require('../models/review');

//rendering admin page with all the users so the admin can select and assign works to them
module.exports.admin=async function(req,res){
    try {
        if(!req.isAuthenticated()){
            console.log("you are not logged in");
            return res.redirect('/');
        }
        if(req.user.isAdmin == false){
            return res.redirect('/');
        }
        let users=await User.find({});
        return res.render('admin',{
            users
        })
    } catch (error) {
        console.log("error",error); 
        return; 
    }
}

//assigning work to the users acording to the recipient and reviewer sended by the admin
module.exports.assignWork= async function (req,res){
   try {
       if(!req.isAuthenticated){
           console.log('please login')
           return res.redirect('/')
       }

       if(req.user.isAdmin == false){
        return res.redirect('/');
       }

       let recipient= await User.findById(req.body.recipient);
       let reviewer= await User.findById(req.body.reviewer);
       if(req.body.recipient === req.body.reviewer){
           return res.redirect('back');
       }
       recipient.from.push(reviewer);
       recipient.save();
       reviewer.for.push(recipient);
       reviewer.save();
       return res.redirect('back')

   } catch (error) {
       console.log("error",error);
       return;
   }
}

//rendering emoloyee page with all the users to show there information
module.exports.allEmplyees= async function(req,res){
    try {
        if(!req.isAuthenticated){
            return res.redirect('/');
        }
    
        if(req.user.isAdmin == false){
            return res.redirect('/');
        }
    
        const users=await User.find({});
        return res.render('employee',{
            users
        });
    } catch (error) {
        console.log("error",error);
        return;
    }
}

//delteing employee from everywhere
module.exports.deleteEmployee= async function(req,res){
   try {
    if(!req.isAuthenticated){
        return res.redirect('/');
    }

    if(req.user.isAdmin == false){
        return res.redirect('/');
    }
     
    let id=req.params.id;
    const users=await User.find({});
    for(let i=0;i<users.length;i++){
       let index=await users[i].from.indexOf(id);
       if(index!==-1){
           while(index!=-1){
                await users[i].from.splice(index,1);
                index= await users[i].from.indexOf(id);
           }
           await users[i].save();
       }
       index=await users[i].for.indexOf(id);
       if(index!==-1){
           while(index!=-1){
                await users[i].for.splice(index,1);
                index= await users[i].for.indexOf(id);
           }
           await users[i].save();
       }
    }
    let reviews=await review.find({from:id});
    for(let i=0;i<reviews.length;i++){
        await review.findByIdAndDelete(reviews[i].id);
    }

    reviews=await review.find({for:id});
    for(let i=0;i<reviews.length;i++){
        await review.findByIdAndDelete(reviews[i].id);
    }

    await User.findByIdAndDelete(id);

    return res.redirect('/admin/view_employees');

   } catch (error) {
       console.log(error);
       return;
   }

}

//making other users as admin too
module.exports.makeAdmin=async function(req,res){
    try {
        if(!req.isAuthenticated){
            return res.redirect('/');
        }
    
        if(req.user.isAdmin == false){
            return res.redirect('/');
        }
        let user=await User.findById(req.body.admin);
        
        if(user.isAdmin==true){
            return res.redirect('back');
        }else{
            user.isAdmin=true;
            await user.save();
        }

        return res.redirect('back');
    } catch (error) {
        console.log(error)
        return;
    }
}
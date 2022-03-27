const mongoose=require('mongoose');
// const uri = process.env.EmployeeReview_URI;

// mongoose
//   .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to Atlas database ');
//   })
//   .catch((err) => {
//     console.error(`Error connecting to the database. \n${err}`);
//   });
mongoose.connect('mongodb://localhost/Employee_Review_System');
//check if connection is made or not
const db=mongoose.connection;
//if error in connecting to db
db.on('error',console.error.bind('Error connecting to MongoDB'));
//if connected to db
db.once('open',function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports=db;
const mongoose=require('mongoose');
const uri = process.env.EmployeeReview_URI;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to Atlas database ');
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

// const db=mongoose.connection;

// db.on('error',console.error.bind('Error connecting to MongoDB'));

// db.once('open',function(){
//     console.log('Connected to Database :: MongoDB');
// });

// module.exports=db;
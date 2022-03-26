//initial setup
const express=require("express");
const app =express();
const port=process.env.PORT || 8000 ;
const cors=require('cors');
const db=require('./config/mongoose');
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('./assets'));

//setiing view engine
app.set("view engine", "ejs");
app.set("views", "./views");



app.use('/',require('./routes'));
//listening to the server
app.listen(port,function(err){
    if(err){
        console.log("ERROR in connectiong to the server");
    }
    console.log(`Server is running on port ${port}`);
})
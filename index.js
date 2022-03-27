//initial setup
const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const db = require("./config/mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const MongoStore = require("connect-mongo");

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("./assets"));

//setiing view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//storing session in database
app.use(
  session({
    name: "employee-review-system",
    secret: "something",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl:'mongodb://localhost/Employeee_Review_System',
        collectionName:'sessions',
        mongooseConnection: db,
        autoRemove: "disabled",
      },

      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

// for authentication
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use("/", require("./routes"));

//listening to the server
app.listen(port, function (err) {
  if (err) {
    console.log("ERROR in connectiong to the server");
  }
  console.log(`Server is running on port ${port}`);
});

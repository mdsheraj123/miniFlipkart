//https://stackoverflow.com/questions/33375726/manage-authentication-of-different-types-of-users-in-express-js-using-passport-j
//Set a role string for different login types

const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const passport = require("passport");

//bring all routes
const auth = require("./routes/api/auth");
const marketItem = require("./routes/api/marketItem");

const app = express();


//Middleware for bodyparser
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//mongoDB configuration
const db = require("./setup/myurl").mongoURL;

//Attempt to connect to database
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.log(err));


//Passport middleware
app.use(passport.initialize());

//Config for JWT strategy
require("./strategies/jsonwtStrategy")(passport);


//just for testing  -> route
app.get("/", (req, res) => {
    res.send("Server is running, please use Postman");
});


//actual routes
app.use("/api/auth", auth);
app.use("/api/marketItem", marketItem);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App is running at ${port}`));
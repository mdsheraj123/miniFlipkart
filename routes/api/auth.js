const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jsonwt = require("jsonwebtoken");
const passport = require("passport");
const key = require("../../setup/myurl");



// @type    GET
// @route   /api/auth
// @desc    just for testing
// @access  PUBLIC
router.get("/", (req, res) => res.json({ test: "Auth is being tested" }));


//Import Schema for Person to Register
const Account = require("../../models/Account");





// @type    POST
// @route   /api/auth/register
// @desc    route for registration of users
// @access  PUBLIC

router.post("/register", (req, res) => { //use password sheraj123
    Account.findOne({ username: req.body.username })
      .then(account => {
        if (account) {
          return res
            .status(400)
            .json({ accounterror: "username is already registered in our system" });
        } else if(req.body.password!="sheraj123") {
            return res
              .status(400)
              .json({ accounterror: "use the predefined password to create an Admin account" });
        } else {
          const newAccount = new Account({
            username: req.body.username,
            password: "sheraj123",
            access: "Admin"
          });
          //Encrypt password using bcrypt
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newAccount.password, salt, (err, hash) => {
              if (err) throw err;
              newAccount.password = hash;
              newAccount
                .save()
                .then(account => res.json(account))
                .catch(err => console.log(err));
            });
          });
        }
      })
      .catch(err => console.log(err));
  });
  












module.exports = router;

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
  



// @type    POST
// @route   /api/auth/login
// @desc    route for login of users
// @access  PUBLIC

router.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    Account.findOne({ username })
    .then(account => {
    if (!account) {
        return res
        .status(404)
        .json({ accounterror: "User not found with this username" });
    }
    bcrypt
        .compare(password, account.password)
        .then(isCorrect => {
        if (isCorrect) {
            // res.json({ success: "User is able to login successfully" });
            //use payload and create token for user
            const payload = {
                id: account.id,
                username: account.username,
                access: account.access
            };
            jsonwt.sign(
                payload,
                key.secret,
                { expiresIn: 5*60*60 },
                (err, token) => {
                    res.json({
                    success: true,
                    token: "Bearer " + token
                    });
                }
            );
        } else {
            res.status(400).json({ passworderror: "Password is not correct" });
        }
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});
  


// @type    GET
// @route   /api/auth/profile
// @desc    route for user profile
// @access  PRIVATE

router.get(
    "/profile",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        // console.log(req);
        res.json({
        id: req.user.id,
        username: req.user.username,
        access: req.user.access,
        });
    }
);
  







module.exports = router;

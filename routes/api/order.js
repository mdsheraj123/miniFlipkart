const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load Account Model
const Account = require("../../models/Account");

//Load MarketItem Model
const MarketItem = require("../../models/MarketItem");

//Load Question Model
const Order = require("../../models/Order");




// @type    GET
// @route   /api/order/
// @desc    route for all past orders of customer
// @access  PRIVATE
router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        if (req.user && req.user.access === "Customer") {
            Order.find({ user: req.user.id })
                .then(order => {
                if (!order) {
                    return res.status(404).json({ ordernotfound: "No past order Found" });
                }
                res.json(order);
                })
                .catch(err => console.log("got some error in order " + err));
        } else {
            res.status(400).json({ passworderror: "You are not authorized" });
        }
    }
);



// @type    POST
// @route   /api/order/
// @desc    route for INSERTING order
// @access  PRIVATE
router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        if (req.user && req.user.access === "Customer") {

            const orderValues = {};
            orderValues.name = req.body.name;
            orderValues.colour = req.body.colour;
            orderValues.size = req.body.size;
            orderValues.type = req.body.type;
            
            //Do database stuff
            MarketItem.findOne(orderValues)
                .then(marketItem => {
                    if (marketItem) {
                        if(marketItem.status == "Sale") {
                            if(marketItem.stock >= req.body.quantity) {
                                if (req.body.description) orderValues.description = req.body.description;
                                orderValues.price = marketItem.price;
                                orderValues.quantity = req.body.quantity;
                                orderValues.status = "pending";

                                //save order
                                new Order(orderValues)
                                .save()
                                .then(order => res.json(order))
                                .catch(err => console.log(err));
                            } else {
                                res.status(400).json({ marketItem: "marketItem not int enough stock" });
                            }
                        } else {
                            res.status(400).json({ marketItem: "marketItem not for sale" });
                        }
                    } else {
                        res.status(400).json({ marketItem: "marketItem does not exist" });
                    }
                })
                .catch(err => console.log("Problem in fetching marketItem" + err));
        } else {
            res.status(400).json({ passworderror: "You are not authorized" });
        }
    }
);
  


///////////////////////////////////////////////////////////////////////////////////////





// @type    GET
// @route   /api/order/all
// @desc    route for all orders of all customers
// @access  PRIVATE
router.get(
    "/all",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        if (req.user && req.user.access === "SalesAgent") {
            Order.find()
                .then(order => {
                if (!order) {
                    return res.status(404).json({ ordernotfound: "No past order Found" });
                }
                res.json(order);
                })
                .catch(err => console.log("got some error in order " + err));
        } else {
            res.status(400).json({ passworderror: "You are not authorized" });
        }
    }
);


  
// @type    POST
// @route   /api/order/all
// @desc    route for UPDATING status of order
// @access  PRIVATE
router.post(
    "/all",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        if (req.user && req.user.access === "SalesAgent") {
            //Do database stuff
            Order.findOne({_id: req.body._id})
                .then(order => {
                    if(order) {
                        const orderValues = {};
                        orderValues.status = req.body.status;

                        Order.findOneAndUpdate(
                            { _id: req.body._id},
                            { $set: orderValues },
                            { new: true }
                        )
                        .then(orderValues => {res.json(orderValues);asyncCall(orderValues);})
                        .catch(err => console.log("problem in update " + err));

                    } else {
                        res.status(400).json({ passworderror: "Order ID does not exist" });
                    }
                })
                .catch(err => console.log("Problem in fetching order" + err));
        } else {
            res.status(400).json({ passworderror: "You are not authorized" });
        }
    }
);
  


function resolveAfter2Seconds(orderValues) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('SMS SENT ' + orderValues);
      }, 2000);
    });
  }
  
  async function asyncCall(orderValues) {
    console.log('calling');
    const result = await resolveAfter2Seconds(orderValues);
    console.log(result);
    // expected output: "resolved"
  }
  

  



// // @type    GET
// //@route    /api/questions/
// // @desc    route for showing all questions
// // @access  PUBLIC
// router.get("/", (req, res) => {
//   Question.find()
//     .sort({ date: "desc" })
//     .then(questions => res.json(questions))
//     .catch(err => res.json({ noquestions: "NO questions to display" }));
// });

// // @type    POST
// //@route    /api/questions/
// // @desc    route for submitting questions
// // @access  PRIVATE

// router.post(
//   "/",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     const newQuestion = new Question({
//       textone: req.body.textone,
//       texttwo: req.body.texttwo,
//       user: req.user.id,
//       name: req.body.name
//     });
//     newQuestion
//       .save()
//       .then(question => res.json(question))
//       .catch(err => console.log("UNable to push question to database " + err));
//   }
// );

// // @type    POST
// //@route    /api/questions/answers/:id
// // @desc    route for submitting answers to questions
// // @access  PRIVATE

// router.post(
//   "/answers/:id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     Question.findById(req.params.id)
//       .then(question => {
//         const newAnswer = {
//           user: req.user.id,
//           name: req.body.name,
//           text: req.body.text
//         };
//         question.answers.unshift(newAnswer);

//         question
//           .save()
//           .then(question => res.json(question))
//           .catch(err => console.log(err));
//       })
//       .catch(err => console.log(err));
//   }
// );

// // @type    POST
// //@route    /api/questions/upvote/:id
// // @desc    route for for upvoting
// // @access  PRIVATE
// router.post(
//   "/upvote/:id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     Profile.findOne({ user: req.user.id })
//       .then(profile => {
//         Question.findById(req.params.id)
//           .then(question => {
//             if (
//               question.upvotes.filter(
//                 upvote => upvote.user.toString() === req.user.id.toString()
//               ).length > 0
//             ) {
//               return res.status(400).json({ noupvote: "User already upvoted" });
//             }
//             question.upvotes.unshift({ user: req.user.id });
//             question
//               .save()
//               .then(question => res.json(question))
//               .catch(err => console.log(err));
//           })
//           .catch(err => console.log(err));
//       })
//       .catch(err => console.log(err));
//   }
// );

// //Assignment - remove upvoting
// // Delete questions
// //Delete all question

// //Create a separate route for linux question










module.exports = router;

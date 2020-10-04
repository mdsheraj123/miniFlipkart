const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load Account Model
const Account = require("../../models/Account");

//Load MarketItem Model
const MarketItem = require("../../models/MarketItem");

// @type    GET
// @route   /api/marketItem/
// @desc    route for all items in market
// @access  PRIVATE
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    MarketItem.find()
      .then(marketItem => {
        if (!marketItem) {
          return res.status(404).json({ marketItemnotfound: "No marketItem Found" });
        }
        res.json(marketItem);
      })
      .catch(err => console.log("got some error in marketItem " + err));
  }
);

// @type    POST
// @route   /api/marketItem/
// @desc    route for INSERTING marketItem
// @access  PRIVATE
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const marketItemValues = {};
    marketItemValues.name = req.body.name;
    marketItemValues.colour = req.body.colour;
    marketItemValues.size = req.body.size;
    marketItemValues.type = req.body.type;

    //Do database stuff
    MarketItem.findOne(marketItemValues)
      .then(marketItem => {
        if (marketItem) {
            res.status(400).json({ marketItem: "marketItem already exists, please modify" });
        } else {
          //save marketItem
          if (req.body.description) marketItemValues.description = req.body.description;
          marketItemValues.price = req.body.price;
          marketItemValues.stock = req.body.stock;
          marketItemValues.status = req.body.status;
          new MarketItem(marketItemValues)
          .save()
          .then(marketItem => res.json(marketItem))
          .catch(err => console.log(err));
        }
      })
      .catch(err => console.log("Problem in fetching marketItem" + err));
  }
);



// @type    PATCH
// @route   /api/marketItem/
// @desc    route for MODIFYING marketItem
// @access  PRIVATE
router.patch(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const marketItemValues = {};
        marketItemValues.name = req.body.name;
        marketItemValues.colour = req.body.colour;
        marketItemValues.size = req.body.size;
        marketItemValues.type = req.body.type;   

        //Do database stuff
        MarketItem.findOne(marketItemValues)
        .then(marketItem => {
            if (marketItem) {
                if(req.body.description) marketItemValues.description = req.body.description;
                if(req.body.price) marketItemValues.price = req.body.price;
                if(req.body.stock) marketItemValues.stock = req.body.stock;
                if(req.body.status) marketItemValues.status = req.body.status;

                MarketItem.findOneAndUpdate(
                    { name: req.body.name , colour: req.body.colour , size: req.body.size, type: req.body.type},
                    { $set: marketItemValues },
                    { new: true }
                )
                .then(marketItemValues => res.json(marketItemValues))
                .catch(err => console.log("problem in update " + err));
            } else {
                res.status(400).json({ marketItem: "marketItem does not already exist, please insert" });
            }
        })
        .catch(err => console.log("Problem in fetching marketItem" + err));
    }
);



// // @type    GET
// //@route    /api/profile/:username
// // @desc    route for getting user profile based on USERNAME
// // @access  PUBLIC
// router.get("/:username", (req, res) => {
//   Profile.findOne({ username: req.params.username })
//     .populate("user", ["name", "profilepic"])
//     .then(profile => {
//       if (!profile) {
//         res.status(404).json({ usernotfound: "User not found" });
//       }
//       res.json(profile);
//     })
//     .catch(err => console.log("Error in fetching username " + err));
// });

// // @type    GET
// //@route    /api/profile/find/everyone
// // @desc    route for getting user profile of EVERYONE
// // @access  PUBLIC
// router.get("/find/everyone", (req, res) => {
//   Profile.find()
//     .populate("user", ["name", "profilepic"])
//     .then(profiles => {
//       if (!profiles) {
//         res.status(404).json({ usernotfound: "NO profile was found" });
//       }
//       res.json(profiles);
//     })
//     .catch(err => console.log("Error in fetching username " + err));
// });

// // @type    DELETE
// //@route    /api/profile/
// // @desc    route for deleting user based on ID
// // @access  PRIVATE

// router.delete(
//   "/",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     Profile.findOne({ user: req.user.id });
//     Profile.findOneAndRemove({ user: req.user.id })
//       .then(() => {
//         Person.findOneAndRemove({ _id: req.user.id })
//           .then(() => res.json({ success: "delete was a success" }))
//           .catch(err => console.log(err));
//       })
//       .catch(err => console.log(err));
//   }
// );

// // @type    POST
// //@route    /api/profile/workrole
// // @desc    route for adding work profile of a person
// // @access  PRIVATE

// router.post(
//   "/workrole",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     Profile.findOne({ user: req.user.id })
//       .then(profile => {
//         //assignment
//         const newWork = {
//           role: req.body.role,
//           company: req.body.company,
//           country: req.body.country,
//           from: req.body.from,
//           to: req.body.to,
//           current: req.body.current,
//           details: req.body.details
//         };
//         profile.workrole.unshift(newWork);
//         profile
//           .save()
//           .then(profile => res.json(profile))
//           .catch(err => console.log(err));
//       })
//       .catch(err => console.log(err));
//   }
// );

// // @type    DELETE
// //@route    /api/profile/workrole/:w_id
// // @desc    route for deleting a specific workrole
// // @access  PRIVATE
// router.delete(
//   "/workrole/:w_id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     Profile.findOne({ user: req.user.id })
//       .then(profile => {
//         //assignemnt to check if we got a profile
//         const removethis = profile.workrole
//           .map(item => item.id)
//           .indexOf(req.params.w_id);

//         profile.workrole.splice(removethis, 1);

//         profile
//           .save()
//           .then(profile => res.json(profile))
//           .catch(err => console.log(err));
//       })
//       .catch(err => console.log(err));
//   }
// );

// //Assignemnt - create a route to delete all elements from array and save that in database

module.exports = router;

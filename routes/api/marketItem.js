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
        //Do database stuff
        MarketItem.findOne({_id: req.body._id})
        .then(marketItem => {
            if (marketItem) {
                const marketItemValues = {};
                if(req.body.name) marketItemValues.name = req.body.name;
                if(req.body.colour) marketItemValues.colour = req.body.colour;
                if(req.body.size) marketItemValues.size = req.body.size;
                if(req.body.type) marketItemValues.type = req.body.type;
                if(req.body.description) marketItemValues.description = req.body.description;
                if(req.body.price) marketItemValues.price = req.body.price;
                if(req.body.stock) marketItemValues.stock = req.body.stock;
                if(req.body.status) marketItemValues.status = req.body.status;

                MarketItem.findOneAndUpdate(
                    { _id: req.body._id},
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


// @type    GET
// @route   /api/marketItem/forsale
// @desc    route for items on Sale in market
// @access  PRIVATE
router.get(
    "/forsale",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        if (req.user && req.user.access === "Customer") {
        MarketItem.find({status: "Sale"})
            .then(marketItem => {
            if (!marketItem) {
                return res.status(404).json({ marketItemnotfound: "No marketItem Found" });
            }
            res.json(marketItem);
            })
            .catch(err => console.log("got some error in marketItem " + err));
        } else {
            res.status(400).json({ passworderror: "You are not authorized, only Customer can do this" });
        }
    }
);


module.exports = router;

const express = require("express");
const router = express.Router();

// @type    GET
// @route   /api/auth
// @desc    just for testing
// @access  PUBLIC
router.get("/", (req, res) => res.json({ test: "Auth is being tested" }));



module.exports = router;
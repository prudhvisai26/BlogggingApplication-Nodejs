const express = require("express");
const isAuthenticated = require("../middlewares/auth");
const router = express.Router();

router.post("/create", isAuthenticated, async (req, res) => {});

module.exports = router;

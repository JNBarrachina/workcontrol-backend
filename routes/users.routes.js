const express = require("express");
const {loginUser, registerUser} = require("../controllers/users.controller")
const router = express.Router();

router.post("/login", loginUser);

module.exports = router;
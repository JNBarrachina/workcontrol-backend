const express = require("express");

const {loginUser} = require("../controllers/users.controller")
const {createSubproject} = require("../controllers/subproject.controller")
const router = express.Router();

router.post("/login", loginUser);
router.post("/subproject", createSubproject)
module.exports = router;
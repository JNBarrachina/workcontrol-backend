const express = require("express");

const {loginUser} = require("../controllers/users.controller")
const {createSubproject} = require("../controllers/subproject.controller")
const {createWorkEntry} = require("../controllers/employeeworkentry.controller")
const {getEmployeeId} = require("../controllers/employeeworkentry.controller")
const router = express.Router();

router.post("/login", loginUser);
router.post("/subproject", createSubproject)
router.post("/workentry", createWorkEntry)
router.get("/workentry", getEmployeeId)
module.exports = router;
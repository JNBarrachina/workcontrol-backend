const express = require("express");

const router = express.Router();

const {getEmployeesAssignments} = require("../controllers/employeesmanager.controller")
const {newEmployeeAssignment} = require("../controllers/employeesmanager.controller")
const {removeEmployeeAssignment} = require("../controllers/employeesmanager.controller")

router.get("/", getEmployeesAssignments);
router.post("/addassignment", newEmployeeAssignment);
router.delete("/removeassignment", removeEmployeeAssignment);

module.exports = router;
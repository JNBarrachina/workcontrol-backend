const express = require("express");

const router = express.Router();

const {getEmployeesAssignments} = require("../controllers/employeesmanager.controller")
const {newEmployeeAssignment} = require("../controllers/employeesmanager.controller")
const {removeEmployeeAssignment} = require("../controllers/employeesmanager.controller")
const {assignProjectToMultipleEmployees} = require("../controllers/employeesmanager.controller");


router.get("/", getEmployeesAssignments);
router.post("/addassignment", newEmployeeAssignment);
router.post("/bulkassign", assignProjectToMultipleEmployees);
router.delete("/removeassignment", removeEmployeeAssignment);

module.exports = router;
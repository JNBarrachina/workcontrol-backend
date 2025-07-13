const express = require("express");

const router = express.Router();

const {getEmployeesAssignments, newEmployeeAssignment, removeEmployeeAssignment} = require("../controllers/employeesmanager.controller");

router.get("/", getEmployeesAssignments);
router.post("/", newEmployeeAssignment);
router.delete("/:id", removeEmployeeAssignment);

module.exports = router;
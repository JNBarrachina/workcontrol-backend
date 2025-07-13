const Employee = require("../models/Employee");
const Project = require("../models/Project");

const getEmployeesAssignments = async (req, res) => {
    try {
        const employees = await Employee.findAll({
            include: {
                model: Project,
            },
        });
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const newEmployeeAssignment = async (req, res) => {
    try {
        const employee = await Employee.create(req.body);
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removeEmployeeAssignment = async (req, res) => {
    try {
        const employee = await Employee.destroy({ where: { id: req.params.id } });
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getEmployeesAssignments,
    newEmployeeAssignment,
    removeEmployeeAssignment
};
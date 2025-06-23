const EmployeeWorkEntry = require("../models/EmployeeWorkEntry")
const SubProject = require("../models/Subproject")
const Employee = require("../models/Employee");

const getEmployeeId = async(req, res) => {
    console.log(req.id);
    const employees = await Employee.findAll({});
    const parsedEmployees = employees.map((employee) => {
        return {
            id: employee.id,
            name: employee.name,
            password: employee.password,
        };
    });
    res.send(parsedEmployees);
}
const createWorkEntry = async(req, res) => {
    const subprojectId = req.body.subprojectId;
    const employeeId = req.body.employeeId;
    const foundSubproject = await SubProject.findByPk(subprojectId);
    if (!foundSubproject) {
        res.status(404).send("SubProject not found");
        return;
    }
    
    const foundEmployee = await Employee.findByPk(employeeId);
    if (!foundEmployee) {
        res.status(404).send("Employee not found");
    }

    const dateworkentry = req.body.date;
    const hoursworkentry = req.body.hours;

    const createdWorkEntry = await EmployeeWorkEntry.create({
        date: dateworkentry,
        hours: hoursworkentry,
        subprojectId: subprojectId,
        employeeId: employeeId,
    });

    res.status(201).send({id: createdWorkEntry.id})


}

const getEmployeeWorkEntry = async(req, res) => {
    const employees = await EmployeeWorkEntry.findAll({where: {employeeId: req.body.id}});
    const subprojectwoks = employees.map((employee) => {
        return {
            SubprojectId: employee.SubprojectId,
        };
    });
    res.send(subprojectwoks);
}
const deleteEmployeeWorkEntry = async(req, res) => {
    const employees = await EmployeeWorkEntry.destroy({where: {employeeId: req.body.id,subprojectId: req.body.SubprojectId}});
    res.send(employees);
}


exports.createWorkEntry = createWorkEntry
exports.getEmployeeId = getEmployeeId
exports.getEmployeeWorkEntry = getEmployeeWorkEntry
exports.deleteEmployeeWorkEntry = deleteEmployeeWorkEntry
const { Op } = require("sequelize");

const Employee = require("../models/Employee");
const SubProject = require("../models/Subproject");
const EmployeeWorkEntry = require("../models/EmployeeWorkEntry");

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

//CREAR UNA NUEVA ENTRADA
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

const deleteEmployeeWorkEntry = async(req, res) => {
    try {
        const employees = await EmployeeWorkEntry.destroy({where: {id: req.body.id}});
        res.status(201).send(employees);
    } catch (error) {
        return res.status(500).send("Borrado fallida", error);
    }
}

const getWorkEntriesByMonth = async (req, res) => {
    const employeeId = parseInt(req.params.employeeId);
    const [year, monthRaw] = req.params.yearMonth.split("-");

    // ✅ Aseguramos mes con dos dígitos
    const month = String(monthRaw).padStart(2, "0");

    try {
        // ✅ Fecha de inicio en formato ISO
        const startDate = `${year}-${month}-01`;

        // ✅ Último día del mes (JS cuenta meses desde 0)
        const endDateObj = new Date(Number(year), Number(month), 0);
        const endDate = endDateObj.toISOString().slice(0, 10); // 'YYYY-MM-DD'

        const entries = await EmployeeWorkEntry.findAll({
            where: {
                EmployeeId: employeeId,
                date: {
                    [Op.between]: [startDate, endDate],
                },
            },
            include: [
                { model: SubProject, attributes: ["name"] },
            ],
            order: [["date", "ASC"]],
        });

        res.status(200).json({ data: entries });
    } catch (error) {
        console.error("Error en getWorkEntriesByMonth:", error);
        res.status(500).json({ message: "Error al obtener las entradas de trabajo" });
    }
};


exports.getEmployeeId = getEmployeeId
exports.createWorkEntry = createWorkEntry
exports.deleteEmployeeWorkEntry = deleteEmployeeWorkEntry
exports.getWorkEntriesByMonth = getWorkEntriesByMonth;

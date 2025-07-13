const Employee = require("../models/Employee");
const Project = require("../models/Project");
const EmployeeProjectAssignment = require("../models/EmployeeProjectAssignment");

const getEmployeesAssignments = async (req, res) => {
    try {
        const employees = await Employee.findAll({
            attributes: ["id", "name", "surname", "email", "tlf", "avatar", "role"],
            include: {
                model: Project,
                attributes: ["id", "name", "isEuropean"],
                through: {
                    attributes: ["assignedAt"],
                },
            },
        });
        res.status(200).json(employees);
    } catch (error) {
        console.error("Error al obtener empleados con asignaciones:", error);
        res.status(500).json({ error: error.message });
    }
};

const newEmployeeAssignment = async (req, res) => {
    const { EmployeeId, ProjectId } = req.body;

    if (!EmployeeId || !ProjectId) {
        return res.status(400).json({ error: "EmployeeId y ProjectId son obligatorios." });
    }

    try {
        const [assignment, created] = await EmployeeProjectAssignment.findOrCreate({
            where: { EmployeeId, ProjectId },
            defaults: { assignedAt: new Date() },
        });

        if (!created) {
            return res.status(409).json({ message: "La asignación ya existe." });
        }

        res.status(201).json(assignment);
    } catch (error) {
        console.error("Error al crear asignación:", error);
        res.status(500).json({ error: error.message });
    }
};

const removeEmployeeAssignment = async (req, res) => {
    const { EmployeeId, ProjectId } = req.body;

    if (!EmployeeId || !ProjectId) {
        return res.status(400).json({ error: "EmployeeId y ProjectId son obligatorios para eliminar." });
    }

    try {
        const deleted = await EmployeeProjectAssignment.destroy({
            where: { EmployeeId, ProjectId },
        });

        if (deleted === 0) {
            return res.status(404).json({ message: "Asignación no encontrada." });
        }

        res.status(200).json({ message: "Asignación eliminada correctamente." });
    } catch (error) {
        console.error("Error al eliminar asignación:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getEmployeesAssignments,
    newEmployeeAssignment,
    removeEmployeeAssignment,
};

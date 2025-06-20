const { DataTypes } = require("sequelize");
const db = require("../db");

const Employee = require("./Employee");
const Project = require("./Project");

const EmployeeProjectAssignment = db.sequelize.define(
    "EmployeeProjectAssignments",
    {
        assignedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        timestamps: false,
    }
);

Employee.belongsToMany(Project, { through: EmployeeProjectAssignment });
Project.belongsToMany(Employee, { through: EmployeeProjectAssignment });

module.exports = EmployeeProjectAssignment;

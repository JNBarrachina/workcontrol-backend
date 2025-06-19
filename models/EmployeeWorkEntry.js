const { DataTypes } = require("sequelize");
const db = require("../db");

const Employee = require("./Employee");
const Subproject = require("./Subproject");

const EmployeeWorkEntry = db.sequelize.define("EmployeeWorkEntry", {
    date: { 
        type: DataTypes.DATEONLY, 
        allowNull: false 
    },
    hours: { 
        type: DataTypes.FLOAT, 
        allowNull: false 
    },
});

EmployeeWorkEntry.belongsTo(Employee, { foreignKey: "employee_id" });
EmployeeWorkEntry.belongsTo(Subproject, { foreignKey: "subproject_id" });


module.exports = EmployeeWorkEntry;
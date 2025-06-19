const { DataTypes } = require("sequelize");
const db = require("../db");

const Project = require("./Project");
const EmployeeDailyCalendar = require("./EmployeeDailyCalendar");
const EmployeeWorkEntry = require("./EmployeeWorkEntry");
const MonthlyWorkValidation = require("./MonthlyWorkValidation");

const Employee = db.sequelize.define(
    'Employees',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dni: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
  );


Employee.hasMany(Project, { foreignKey: "created_by" });
Project.belongsTo(Employee, { foreignKey: "created_by" });

Employee.hasMany(EmployeeDailyCalendar, { foreignKey: "employee_id" });
EmployeeDailyCalendar.belongsTo(Employee, { foreignKey: "employee_id" });

Employee.hasMany(EmployeeWorkEntry, { foreignKey: "employee_id" });

Employee.hasMany(MonthlyWorkValidation, { foreignKey: "employee_id" });
MonthlyWorkValidation.belongsTo(Employee, { foreignKey: "employee_id" });


module.exports = Employee;
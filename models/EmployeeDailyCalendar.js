const { DataTypes } = require("sequelize");
const db = require("../db");

const Employee = require("./Employee");
const DayCode = require("./DayCode");

const EmployeeDailyCalendar = db.sequelize.define("EmployeeDailyCalendar", {
  date: { type: DataTypes.DATEONLY, allowNull: false }
});

EmployeeDailyCalendar.belongsTo(DayCode, { foreignKey: "day_type_id" });
DayCode.hasMany(EmployeeDailyCalendar, { foreignKey: "day_type_id" });


module.exports = EmployeeDailyCalendar;

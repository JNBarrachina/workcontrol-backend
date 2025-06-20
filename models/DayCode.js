const { DataTypes } = require("sequelize");
const db = require("../db");

const EmployeeDailyCalendar = require("./EmployeeDailyCalendar");

const DayCode = db.sequelize.define(
    "DayCodes",
    {
        code: {
            type: DataTypes.STRING(5),
            allowNull: false,
            unique: true,
        },
        label: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = DayCode;

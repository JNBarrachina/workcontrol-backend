const { DataTypes } = require("sequelize");
const db = require("../db");

const dailyCalendarModel = db.sequelize.define(
    'Subprojects',
    {
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      dayType: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
    },
  );


module.exports = dailyCalendarModel;
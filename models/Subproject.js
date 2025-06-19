const { DataTypes } = require("sequelize");
const db = require("../db");

const Project = require("./Project");
const EmployeeWorkEntry = require("./EmployeeWorkEntry");

const Subproject = db.sequelize.define(
    'Subprojects',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
  );

Subproject.hasMany(EmployeeWorkEntry);
EmployeeWorkEntry.belongsTo(Subproject);


module.exports = Subproject;
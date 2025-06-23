const { DataTypes } = require("sequelize");
const db = require("../db");

const EmployeeWorkEntry = require("./EmployeeWorkEntry");

const Subproject = db.sequelize.define(
    "Subprojects",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

Subproject.hasMany(EmployeeWorkEntry, { foreignKey: "subprojectId" });
EmployeeWorkEntry.belongsTo(Subproject, { foreignKey: "subprojectId" });

module.exports = Subproject;

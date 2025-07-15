const { DataTypes } = require("sequelize");
const db = require("../db");

const Subproject = require("./Subproject");

const Project = db.sequelize.define(
    "Projects",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isEuropean: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        closedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        timestamps: true,
    },
);

Project.hasMany(Subproject);
Subproject.belongsTo(Project);

module.exports = Project;

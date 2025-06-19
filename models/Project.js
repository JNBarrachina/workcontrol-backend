const { DataTypes } = require("sequelize");
const db = require("../db");

const Employee = require("./Employee");
const Subproject = require("./Subproject");

const Project = db.sequelize.define("Projects", {
  name: DataTypes.STRING,
  description: DataTypes.TEXT
});


Project.hasMany(Subproject);
Subproject.belongsTo(Project, { foreignKey: "project_id" });


module.exports = Project;
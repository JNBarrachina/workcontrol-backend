const { DataTypes } = require("sequelize");
const db = require("../db");

const Subproject = require("./Subproject");

const Project = db.sequelize.define("Projects", {
  name: DataTypes.STRING,
  description: DataTypes.TEXT
});


Project.hasMany(Subproject);
Subproject.belongsTo(Project);

module.exports = Project;
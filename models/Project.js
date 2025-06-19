const { DataTypes } = require("sequelize");
const db = require("../db");

const projectModel = db.sequelize.define(
    'Projects',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
  );

  
module.exports = projectModel;
const { DataTypes } = require("sequelize");
const db = require("../db");

const subprojectModel = db.sequelize.define(
    'Subprojects',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
  );

  
module.exports = subprojectModel;
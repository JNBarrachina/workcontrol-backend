const { DataTypes } = require("sequelize");
const db = require("../db");

const dayTypeCodeModel = db.sequelize.define(
    'Subprojects',
    {
      codeType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      typeValue: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
    },
  );


module.exports = dayTypeCodeModel;
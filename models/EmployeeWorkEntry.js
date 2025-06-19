const { DataTypes } = require("sequelize");
const db = require("../db");

const EmployeeWorkEntry = db.sequelize.define("EmployeeWorkEntry", {
    date: { 
        type: DataTypes.DATEONLY, 
        allowNull: false 
    },
    hours: { 
        type: DataTypes.FLOAT, 
        allowNull: false 
    },
});


module.exports = EmployeeWorkEntry;
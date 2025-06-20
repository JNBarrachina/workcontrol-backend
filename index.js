const port = 3000;
const mysql = './db.js';

const express = require("express");
const cors = require("cors");
const db = require("./db")

require("./models/Employee");
require("./models/Project");
require("./models/Subproject");
require("./models/DayCode");
require("./models/EmployeeDailyCalendar");
require("./models/EmployeeWorkEntry");
require("./models/MonthlyWorkValidation");
require("./models/EmployeeProjectAssignment");

const usersRouter = require("./routes/users.routes");

const main = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use("/users", usersRouter);

  // Cual es url del endpoint
  /*
  app.get('/', (res, req)=>{
    // req.rol
    let res; 
      if(req.rol == 'admin'){
        
      }

      if(){
        
      }
      res.sta
  })
  */

  db.sequelize.sync({ alter: true } )
    .then(() => {
      console.log("Base de datos sincronizada correctamente.");

      app.listen(port, () => {
        console.log(`Servidor escuchando en puerto ${port}`);
      });
    })

    .catch((error) => {
      console.error("Error sincronizando base de datos:", error);
    });
};

main();

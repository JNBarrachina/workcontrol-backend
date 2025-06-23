//Rama Tomas
const port = 3000;
const mysql = './db.js';

const express = require("express");
const cors = require("cors");
const db = require("./db");


require("./models/Employee");
require("./models/Project");
require("./models/Subproject");
require("./models/DayCode");
require("./models/EmployeeDailyCalendar");
require("./models/EmployeeWorkEntry");
require("./models/MonthlyWorkValidation");
require("./models/EmployeeProjectAssignment");
const authMiddleware = require("./middlewares/auth.js")


const usersRouter = require("./routes/users.routes");
const calendarRouter = require("./routes/calendar.routes");
const fetchsRoutes = require("./routes/fetchs.routes.js")

const main = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use("/users", usersRouter);
    app.use("/calendar", calendarRouter);
    app.use("/fetchs/", fetchsRoutes);

    db.sequelize
        .sync({})
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
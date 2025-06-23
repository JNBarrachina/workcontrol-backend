//Rama Tomas
const port = 3000;

const express = require("express");
const cors = require("cors");
const db = require("./db");
const authMiddleware = require("./middlewares/auth");
require("./models/Employee");
require("./models/Project");
require("./models/Subproject");
require("./models/DayCode");
require("./models/EmployeeDailyCalendar");
require("./models/EmployeeWorkEntry");
require("./models/MonthlyWorkValidation");
require("./models/EmployeeProjectAssignment");

const workentryRoutes = require("./routes/employeeworkentry.routes");
const usersRouter = require("./routes/users.routes");
const calendarRouter = require("./routes/calendar.routes");

const main = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use("/users", authMiddleware.authMiddleware, usersRouter);
    app.use("/calendar", calendarRouter);
    app.use("/api", workentryRoutes);

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

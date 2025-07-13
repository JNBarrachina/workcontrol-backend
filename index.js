const port = 3000;

const express = require("express");
const cors = require("cors");
const db = require("./db");
const fileUpload = require("express-fileupload");

const authMiddleware = require("./middlewares/auth");

const Employee = require("./models/Employee");
const Project = require("./models/Project");
const SubProject = require("./models/Subproject");
const DayCode = require("./models/DayCode");
const EmployeeDailyCalendar = require("./models/EmployeeDailyCalendar");
const EmployeeWorkEntry = require("./models/EmployeeWorkEntry");
const MonthlyWorkValidation = require("./models/MonthlyWorkValidation");
const EmployeeProjectAssignment = require("./models/EmployeeProjectAssignment");

const workentryRoutes = require("./routes/employeeworkentry.routes");
const usersRouter = require("./routes/users.routes");
const calendarRouter = require("./routes/calendar.routes");
const fetchs = require("./routes/fetch.routes");
const uploads = require("./routes/uploads.routes")

const main = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(fileUpload());

    app.use("/users", usersRouter);
    app.use("/calendar", calendarRouter);
    app.use('/fetchs', fetchs);
    app.use("/api", workentryRoutes);
    app.use("/uploads", uploads);


db.sequelize.sync()
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

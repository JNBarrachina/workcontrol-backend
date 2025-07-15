const port = 3000;

const express = require("express");
const cors = require("cors");
const db = require("./db");
const fileUpload = require("express-fileupload");

const authMiddleware = require("./middlewares/auth");

const workentryRoutes = require("./routes/employeeworkentry.routes");
const usersRouter = require("./routes/users.routes");
const calendarRouter = require("./routes/calendar.routes");
const projectsRouter = require("./routes/projectsmanager.routes");
const employeesRouter = require("./routes/employeesmanager.routes");
const fetchs = require("./routes/fetch.routes");
const uploads = require("./routes/uploads.routes");

const main = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(fileUpload());

    app.use("/users", usersRouter);
    app.use("/calendar", calendarRouter);
    app.use("/fetchs", fetchs);
    app.use("/projects", projectsRouter);
    app.use("/employees", employeesRouter);
    app.use("/employeework", workentryRoutes);
    app.use("/uploads", uploads);

    db.sequelize
        .sync()
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

//Rama Tomas
const port = 3000;
const mysql = './db.js';

const express = require("express");
const cors = require("cors");
const db = require("./db");

const Employee =  require("./models/Employee");
const Prject =  require("./models/Project");
const Subproject =  require("./models/Subproject");

require("./models/DayCode");
require("./models/EmployeeDailyCalendar");
require("./models/EmployeeWorkEntry");
require("./models/MonthlyWorkValidation");
require("./models/EmployeeProjectAssignment");
const authMiddleware = require("./middlewares/auth.js")

const usersRouter = require("./routes/users.routes");
const calendarRouter = require("./routes/calendar.routes");

const main = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use("/users", authMiddleware.authMiddleware, usersRouter);
    app.use("/calendar", calendarRouter);

    //ADMIN
    app.get('/employeeds_projects', async (req, res)=>{
        try{
            const results = await db.sequelize.query(`
                select e.name as Employeed, p.name as 'Assigned Project', ea.assignedAT as 'Date Assigned'
                from workcontroldb.employees e, workcontroldb.projects p, workcontroldb.employeeprojectassignments ea 
                where ea.EmployeeId = e.id and ea.ProjectId = p.id
                order by e.name ASC;
            `);

            if (!results) {
                res.status(400).send("EMPLOYEEDS_DON'T_HAVE_ASSIGNED_PROJECTS");
                return;
            }

            res.status(201).send( results );

        } catch (err){
            res.status(500).send(err);
        }
    });

    //USER
    app.post('/employeed_assigned', async (req, res)=>{
        try{
            const {rol, name} = req?.body;

            const results = await db.sequelize.query(`
                SELECT e.name AS 'Employeed', p.name AS 'Assigned Project', ea.assignedAT AS 'Date Assigned'
                FROM workcontroldb.employees e
                JOIN workcontroldb.employeeprojectassignments ea ON ea.EmployeeId = e.id
                JOIN workcontroldb.projects p ON ea.ProjectId = p.id
                WHERE e.name = :name;
            `, {
                replacements: { name },      // parámetros
                type: db.sequelize.QueryTypes.SELECT 
            });

            if (!results) {
                res.status(400).send("THE_EMPLOYEED_DON'T_HAVE_ASSIGNED_PROJECTS");
                return;
            }

            res.status(201).send( results );

        } catch (err){
            res.status(500).send(err);
        }
    });

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
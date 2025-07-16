const express = require("express");

const db = require('../db.js');
const router = express.Router();

//ADMIN
    router.get('/employeeds_projects', async (req, res)=>{
        try{
            const results = await db.sequelize.query(`
                SELECT 
                e.name AS Employeed, 
                p.name AS 'Assigned Project', 
                su.name AS 'Assigned SubProject', 
                ea.assignedAT AS 'Date Assigned'
                FROM 
                workcontroldb.Employees e,
                workcontroldb.Projects p, 
                workcontroldb.Subprojects su,
                workcontroldb.EmployeeProjectAssignments ea
                WHERE 
                ea.EmployeeId = e.id AND 
                ea.ProjectId = p.id AND 
                su.ProjectId = p.id;
            `);

            if (!results) {
                res.status(400).send("EMPLOYEEDS_DON'T_HAVE_ASSIGNED_PROJECTS");
                return;
            }

            res.status(201).json( results );

        } catch (err){
            res.status(500).send(err);
        }
    });

    //USER
    router.post('/employeed_assigned', async (req, res)=>{
        console.log(req.body);

        try{
            const {rol, id} = req?.body;

            const results = await db.sequelize.query(`
            SELECT 
            e.name AS Employeed, 
            p.name AS 'Assigned Project', 
            su.name AS 'Assigned SubProject', 
            ea.assignedAT AS 'Date Assigned'
            FROM 
            workcontroldb.Employees e, 
            workcontroldb.EmployeeProjectAssignments ea, 
            workcontroldb.Projects p, 
            workcontroldb.Subprojects su
            WHERE 
            ea.EmployeeId = e.id AND 
            ea.ProjectId = p.id AND 
            su.ProjectId = p.id AND
            e.id = :id;
            `, {
                replacements: { id },  
                type: db.sequelize.QueryTypes.SELECT 
            });

            if (!results) {
                res.status(400).send("THE_EMPLOYEED_DON'T_HAVE_ASSIGNED_PROJECTS");
                return;
            }

            res.status(201).json( results );

        } catch (err){
            res.status(500).send(err);
        }
    });


    router.post('/employeed_subprojects_assignedbyId', async (req, res)=>{
    try{
            const {rol, name, id} = req?.body;

            const results = await db.sequelize.query(`
            SELECT su.name AS 'SubProyectos'
            FROM 
            workcontroldb.employees e, 
            workcontroldb.employeeprojectassignments ea, 
            workcontroldb.projects p, 
            workcontroldb.subprojects su
            WHERE 
            ea.EmployeeId = e.id AND 
            ea.ProjectId = p.id AND 
            su.ProjectId = p.id AND
            e.id = :id;
            `, {
                replacements: { id },  
                type: db.sequelize.QueryTypes.SELECT 
            });

            if (!results) {
                res.status(400).send("THE_EMPLOYEED_DON'T_HAVE_ASSIGNED_SUBPROJECTS");
                return;
            }

            res.status(201).json( results );

        } catch (err){
            res.status(500).send(err);
        }
    });

    router.get('/monthlyworkvalidations/:year/:month/:id_employee', async (req, res) => {
        const { year, month, id_employee } = req.params;

        try {
            const results = await db.sequelize.query(`
                SELECT *
                FROM workcontroldb.monthlyworkvalidations
                WHERE year = :year AND month = :month AND EmployeeId = :id_employee;
            `, {
                replacements: { year, month, id_employee },
                type: db.sequelize.QueryTypes.SELECT 
            });

            res.json(results); // 👈 devolver los resultados como JSON
        } catch (error) {
            console.error("Error en GET /monthlyworkvalidations:", error);
            res.status(500).json({ error: "Error al obtener validación mensual" });
        }
    });

    router.post('/monthlyworkvalidations/:year/:month/:id_employee', async (req, res) => {
        const { year, month, id_employee } = req.params;

        try {

            const results = await db.sequelize.query(`
                SELECT *
                FROM workcontroldb.monthlyworkvalidations
                WHERE year = :year AND month = :month AND EmployeeId = :id_employee;
            `, {
                replacements: { year, month, id_employee },
                type: db.sequelize.QueryTypes.SELECT 
            });


            if(results.length >= 1){
                const del = await db.sequelize.query(`
                DELETE FROM workcontroldb.monthlyworkvalidations
                WHERE EmployeeId = :id_employee AND year = :year AND month = :month;
            `, {
                replacements: { id_employee, year, month, },
                type: db.sequelize.QueryTypes.DELETE,
            });
            }

            //cretae time cretate
            new_date= () => {
                const fecha = new Date();
                const anio = fecha.getFullYear();
                const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // enero es 0
                const dia = fecha.getDate().toString().padStart(2, '0');

                const horas = fecha.getHours().toString().padStart(2, '0');
                const minutos = fecha.getMinutes().toString().padStart(2, '0');
                const segundos = fecha.getSeconds().toString().padStart(2, '0');

                return `${anio}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
            }

            const fechaMysql = new_date();
            //console.log(fechaMysql); // Ejemplo: "2025-07-15 20:05:53"

            await db.sequelize.query(
                `INSERT INTO workcontroldb.monthlyworkvalidations
                (
                    id, year, month, isSignedByEmployee, signedAtEmployee,
                    isSignedBySupervisor, signedAtSupervisor, locked, EmployeeId
                )
                VALUES (
                    NULL, :year, :month, 1, :fechaMysql, 0, NULL, 0, :id_employee
                );`, {
                    replacements: { year, month, fechaMysql, id_employee },
                    type: db.sequelize.QueryTypes.INSERT
                }
            );

            res.json({ ok: true, message: 'Created Timesheet', date_create: `${fechaMysql}` });

        } catch (err) {
            console.error('Error en inserción:', err);
            res.status(500).json({ success: false, message: 'Error With Timesheet Created', error: err });
        }
    });

module.exports = router;
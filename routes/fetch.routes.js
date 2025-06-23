const express = require("express");

const db = require('../db.js');
const router = express.Router();

//ADMIN
    router.get('/employeeds_projects', async (req, res)=>{
        try{
            const results = await db.sequelize.query(`
                select e.name as Employee, p.name as 'Assigned Project', ea.assignedAT as 'Date Assigned'
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
    router.post('/employeed_assigned', async (req, res)=>{
        try{
            const {rol, name} = req?.body;

            const results = await db.sequelize.query(`
                SELECT e.name AS 'Employee', p.name AS 'Assigned Project', ea.assignedAT AS 'Date Assigned'
                FROM workcontroldb.employees e
                JOIN workcontroldb.employeeprojectassignments ea ON ea.EmployeeId = e.id
                JOIN workcontroldb.projects p ON ea.ProjectId = p.id
                WHERE e.name = :name;
            `, {
                replacements: { name },  
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


    router.post('/employeed_subprojects_assigned', async (req, res)=>{
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

            res.status(201).send( results );

        } catch (err){
            res.status(500).send(err);
        }

    });

module.exports = router;
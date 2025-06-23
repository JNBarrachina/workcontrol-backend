const express = require("express");

const db = require('../db.js');
const router = express.Router();

//ADMIN
    router.get('/employeeds_projects', async (req, res)=>{
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
    router.post('/employeed_assigned', async (req, res)=>{
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

module.exports = router;
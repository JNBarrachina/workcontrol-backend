const express = require("express");
const { loginUser } = require("../controllers/users.controller");
const { registerUser } = require("../controllers/users.controller");
/* Este impor rompe el controlador aun no existe
const { createSubproject } = require("../controllers/subproject.controller");
*/

'../controllers/users.controller.js'


const {
    createWorkEntry,
} = require("../controllers/employeeworkentry.controller");
const {
    getEmployeeId,
} = require("../controllers/employeeworkentry.controller");
const {
    deleteEmployeeWorkEntry,
} = require("../controllers/employeeworkentry.controller");
const {
    getUserProjects,
} = require("../controllers/employeeworkentry.controller");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/userprojects/:id", getUserProjects);
router.get("/employee", getEmployeeId);
router.post("/newworkentry", createWorkEntry);
router.delete("/rmworkentry", deleteEmployeeWorkEntry);

/* Lo mismo el controlador aun no existe y rompe
router.post("/subproject", createSubproject);
*/


module.exports = router;


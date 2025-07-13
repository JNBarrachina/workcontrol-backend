const express = require("express");

const router = express.Router();

const { getProjects } = require("../controllers/projectsmanager.controller");
const { newProject } = require("../controllers/projectsmanager.controller");
const { newSubproject } = require("../controllers/projectsmanager.controller");
const { editSubproject } = require("../controllers/projectsmanager.controller");
const { removeSubproject } = require("../controllers/projectsmanager.controller");

router.get("/", getProjects);
router.post("/", newProject);
router.post("/subproject", newSubproject);
router.patch("/subproject/:id", editSubproject);
router.delete("/subproject/:id", removeSubproject);

module.exports = router;
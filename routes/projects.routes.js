const express = require("express");

const router = express.Router();

const { getProjects } = require("../controllers/projects.controller");
const { newProject } = require("../controllers/projects.controller");
const { newSubproject } = require("../controllers/projects.controller");
const { editSubproject } = require("../controllers/projects.controller");
const { removeSubproject } = require("../controllers/projects.controller");

router.get("/", getProjects);
router.post("/", newProject);
router.post("/subproject", newSubproject);
router.patch("/subproject/:id", editSubproject);
router.delete("/subproject/:id", removeSubproject);

module.exports = router;
const Project = require("../models/Project");
const SubProject = require("../models/Subproject");

const getProjects = async (req, res) => {
    try {
        const projects = await Project.findAll({
            include: [
                {
                    model: SubProject,
                },
            ],
        });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const newProject = async (req, res) => {
    try {
        const project = await Project.create(req.body);
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const newSubproject = async (req, res) => {
    try {
        const subproject = await SubProject.create(req.body);
        res.status(200).json(subproject);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const editSubproject = async (req, res) => {
    try {
        const subproject = await SubProject.update(req.body, { where: { id: req.params.id } });
        res.status(200).json(subproject);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removeSubproject = async (req, res) => {
    try {
        const subproject = await SubProject.destroy({ where: { id: req.params.id } });
        res.status(200).json(subproject);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getProjects,
    newProject,
    newSubproject,
    editSubproject,
    removeSubproject
};
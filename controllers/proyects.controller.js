const { Op } = require("sequelize");

const Project = require("../models/Project");

const getProyects = async (req, res) => {
    try {
        const Projects = await Project.findAll({});
        res.status(200).send(Projects);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};



module.exports = { getProyects };
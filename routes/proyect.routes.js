const express = require("express");
const {getProyects} = require("../controllers/proyects.controller")

const router = express.Router();

router.get("/eur", getProyects);

module.exports = router;
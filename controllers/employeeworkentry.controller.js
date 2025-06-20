const EmployeeWorkEntry = require("../models/EmployeeWorkEntry")

const createWorkEntry = async(req, res) => {
    const dateworkentry = req.body.date;
    const hoursworkentry = req.body.hours;

    const createdWorkEntry = await EmployeeWorkEntry.create({
        date: dateworkentry,
        hours: hoursworkentry
    });

    res.status(201).send({id: createdWorkEntry.id})


}

exports.createWorkEntry = createWorkEntry
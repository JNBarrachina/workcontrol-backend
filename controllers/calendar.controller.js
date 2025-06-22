const { Op } = require("sequelize");

const EmployeeDailyCalendar = require("../models/EmployeeDailyCalendar");
const DayCodes = require("../models/DayCode");

const getMonthUserCalendar = async (req, res) => {
    const year = parseInt(req.params.date.split("-")[0]);
    const month = parseInt(req.params.date.split("-")[1]);
    console.log(typeof year, typeof month);

    const userId = 1

    try {
        const userMonthCalendar = await EmployeeDailyCalendar.findAll({ 
            where: {
                EmployeeId: userId,
                date: {
                    [Op.gte]: `${year}-${month}-01`,
                    [Op.lte]: `${year}-${month}-31`
                }
            }, 
            include: {
                model: DayCodes,
                attributes: ["code", "label"]
            },
            order: [["date", "ASC"]]
        });

        res.status(200).json(userMonthCalendar);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const patchUserDayType = async (req, res) => {
    const dayId = req.params.day;
    const dayType = parseInt(req.body.DayType);

    console.log(dayId, dayType);

    // try {
    //     const updatedDay = await EmployeeDailyCalendar.update(
    //         { DayCodeId: dayType },
    //         { where: { id: dayId } }
    //     );

    //     console.log(updatedDay);
    //     res.status(200)
    // } catch (error) {
    //     res.status(500).json({ message: error.message });
    // }
};


module.exports = {
    getMonthUserCalendar,
    patchUserDayType
};
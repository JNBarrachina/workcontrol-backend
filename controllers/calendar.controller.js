const { Op } = require("sequelize");

const EmployeeDailyCalendar = require("../models/EmployeeDailyCalendar");
const DayCodes = require("../models/DayCode");

const getMonthUserCalendar = async (req, res) => {
    const [yearStr, monthStr] = req.params.date.split("-");
    const year = parseInt(yearStr);
    const month = parseInt(monthStr);

    const paddedMonth = monthStr.padStart(2, "0");
    const startDate = `${year}-${paddedMonth}-01`;
    const endDateObj = new Date(year, month, 0); // último día del mes
    const endDate = endDateObj.toISOString().slice(0, 10);

    const userId = 1;

    try {
        const userMonthCalendar = await EmployeeDailyCalendar.findAll({ 
            where: {
                EmployeeId: userId,
                date: {
                    [Op.gte]: startDate,
                    [Op.lte]: endDate
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
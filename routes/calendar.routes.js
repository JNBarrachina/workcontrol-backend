const express = require("express");
const {getMonthUserCalendar, patchUserDayType} = require("../controllers/calendar.controller")

const router = express.Router();

router.get("/:date", getMonthUserCalendar);
router.patch("/:day", patchUserDayType);

module.exports = router;
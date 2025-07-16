const express = require("express");
const router = express.Router();


const {getMonthUserCalendar, patchUserDayType} = require("../controllers/calendar.controller")
const { getValidationsByMonth } = require("../controllers/calendar.controller");

router.get("/:userId/:date", getMonthUserCalendar);
router.patch("/:day", patchUserDayType);
router.get("/admin/validations/:year/:month", getValidationsByMonth);

module.exports = router;
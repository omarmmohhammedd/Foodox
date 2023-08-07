const { check } = require("express-validator")
const validator = require("../middleware/validator")

exports.makeScheduleValidator = [
    check("period").notEmpty().isIn(["week", "month"]).withMessage("Please Add Valid Value For Period Such as week Or  month"),
    check("work_from").notEmpty().isTime().withMessage("Please Add Valid Time For Work From"),
    check("work_to").notEmpty().isTime().withMessage("Please Add Valid Time For Work From"),
    check("break_from").notEmpty().isTime().withMessage("Please Add Valid Time For Work From"),
    check("break_to").notEmpty().isTime().withMessage("Please Add Valid Time For Work From"),
    validator
]

exports.editScheduleValidator = [
    check("period").optional().notEmpty().isIn(["week", "month"]).withMessage("Please Add Valid Value For Period Such as week Or  month"),
    check("work_from").optional().notEmpty().isTime().withMessage("Please Add Valid Time For Work From"),
    check("work_to").optional().notEmpty().isTime().withMessage("Please Add Valid Time For Work From"),
    check("break_from").optional().notEmpty().isTime().withMessage("Please Add Valid Time For Work From"),
    check("break_to").optional().notEmpty().isTime().withMessage("Please Add Valid Time For Work From"),
    validator
]
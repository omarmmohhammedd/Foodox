const { check } = require("express-validator")
const validator = require("../middleware/validator")

exports.makeScheduleValidator = [
    check("period").notEmpty().isIn(["week", "month"]).withMessage("Please Add Valid Value For Period Such as week Or  month"),
    check("work_from").notEmpty().withMessage("Please Add Valid Time For Work From"),
    check("work_to").notEmpty().withMessage("Please Add Valid Time For Work From"),
    check("break_from").notEmpty().withMessage("Please Add Valid Time For Work From"),
    check("break_to").notEmpty().withMessage("Please Add Valid Time For Work From"),
    check("days").isLength({min:1}).withMessage("Please Add Work Days"),
    validator
]

exports.editScheduleValidator = [
    check("period").optional().notEmpty().isIn(["week", "month"]).withMessage("Please Add Valid Value For Period Such as week Or  month"),
    check("work_from").optional().notEmpty().withMessage("Please Add Valid Time For Work From"),
    check("work_to").optional().notEmpty().withMessage("Please Add Valid Time For Work From"),
    check("break_from").optional().notEmpty().withMessage("Please Add Valid Time For Work From"),
    check("break_to").optional().notEmpty().withMessage("Please Add Valid Time For Work From"),
    check("days").optional().isLength({ min: 1 }).withMessage("Please Add Work Days"),
    validator
]
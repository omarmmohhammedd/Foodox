const { check } = require("express-validator")
const validator = require("../middleware/validator")
const apiError = require("../middleware/apiError")

exports.addFoodValidator = [
    check("name").notEmpty().withMessage("Please Add valid food Name"),
    check("price").notEmpty().withMessage("Please Add valid price"),
    check("category").notEmpty().withMessage("Please Add valid category"),
    check("type").notEmpty().withMessage("Please Add valid type"),
    validator
]

exports.editFoodValidator = [
    check("name").optional().notEmpty().withMessage("Please Add valid food Name"),
    check("price").optional().notEmpty().withMessage("Please Add valid price"),
    check("category").optional().notEmpty().withMessage("Please Add valid category"),
    check("type").optional().notEmpty().withMessage("Please Add valid type"),
    validator
]
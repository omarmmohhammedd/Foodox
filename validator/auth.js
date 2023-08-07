const { check } = require("express-validator")
const validator = require("../middleware/validator")
const ApiError = require("../middleware/apiError")

exports.LoginValidator = [
    check("email").notEmpty().isEmail().withMessage("Please Enter valid Email"),
    check("password").notEmpty().isLength({ min: 6 }).withMessage("Please Enter valid Password With Min 6 characters"),
    validator
]
exports.RegisterValidator = [
    check("username").notEmpty().withMessage("Please Enter valid Username"),
    check("phone").notEmpty().isMobilePhone().withMessage("Please Enter valid Phone Number"),
    check("email").notEmpty().isEmail().withMessage("Please Enter valid Email"),
    check("password").notEmpty().isLength({ min: 6 }).withMessage("Please Enter valid Password With Min 6 characters").custom(async (password, { req }) => {
        if (password !== req.body.confirmPassword) {
             throw new ApiError("Password And Confirm Password Must Equals")
        }
        return true
    }),
    validator
]
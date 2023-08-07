const User = require("../../model/User")
const asyncHandler = require("express-async-handler")
const {sign} = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const ApiError = require("../../middleware/apiError")

exports.Login =  asyncHandler(async(req,res,next) => {
    const { email, password } = req.body
    await User.findOne({ email }).then(async(user) => {
        if (!user) return next(new ApiError("User Not Found",404))
        else {
            const matchPassword = await bcrypt.compare(password, user.password)
            if (!matchPassword) return next(new ApiError("Password Not Match", 400))
            const token = sign({ id: user.id, role: user.role }, process.env.TOKEN, { expiresIn: "30d" })
            delete user._doc.password
            res.json({user,token})
        }
    })
})

exports.Register = asyncHandler(async (req, res, next) => {
    const { username, email, phone, password } = req.body
    await User.findOne({ email }).then(async(exists) => {
        if (exists) return next(new ApiError("User already exists With Same Email", 409))
        await User.create({email,username,password:await bcrypt.hash(password,10),phone}).then((user)=>res.status(201).json({user}))
    })
})
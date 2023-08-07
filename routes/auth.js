const { Register, Login } = require("../controllers/auth")
const { LoginValidator, RegisterValidator } = require("../validator/auth")
const route = require("express").Router()
route.post("/login", LoginValidator,Login)
route.post("/reg", RegisterValidator, Register)
module.exports = route
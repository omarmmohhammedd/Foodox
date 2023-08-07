const express = require('express')
const mongoose = require('mongoose')
require("dotenv").config()
const app = express()
const port = process.env.PORT || 8000
const path = require('path')
const verifyToken = require("./middleware/verifyToken")
const verifyRoles = require("./middleware/verifyRoles")
const checkExpire = require('./utils/checkExpire')
app.use(require("cors")())
app.use(require("morgan")("dev"))

// Built In Middleware 
app.use(express.json())
app.use("/images", express.static(path.join(__dirname, "images")))

// App Routes
app.use("/auth", require("./routes/auth"))
app.use("/user", verifyToken, require("./routes/user"))
app.use("/admin", verifyRoles("admin"), require("./routes/admin"))

// Midlleware Route Error Handler
app.use(require("./middleware/errorMiddlware"))
checkExpire()

// Connecting To DataBase Server And Lunching Server
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
    .then((connection) => app.listen(port, () => console.log(`App Running On Port ${port} And Connect To Database ${connection.connection.host}`)))
    .catch((e) => console.error(e))
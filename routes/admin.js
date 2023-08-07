const { addFood, editFood, deleteFood } = require("../controllers/admin")
const { addFoodValidator,editFoodValidator } = require("../validator/admin")
const route = require("express").Router()
const imgUploader = require("../middleware/Multer")

route.post("/food", imgUploader.single("img"), addFoodValidator, addFood)
route.put("/food/:food_id", imgUploader.single("img"), editFoodValidator, editFood)
route.delete("/food/:food_id",deleteFood)
module.exports = route
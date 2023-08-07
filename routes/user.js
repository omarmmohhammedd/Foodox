const { getFoods, filterFoods, AddFoodToMenu, deleteFoodFromMenu, getUserMenu, MakeSchedule, editSchedule, getUserSchedule, getRandomFood } = require("../controllers/user")
const { makeScheduleValidator, editScheduleValidator } = require("../validator/user")

const route = require("express").Router()

route.get("/food", getFoods)
route.get("/foods", filterFoods)
route.get("/menu", getUserMenu)
route.post("/menu", AddFoodToMenu)
route.delete("/menu/:food_id", deleteFoodFromMenu)
route.get("/schedule", getUserSchedule)
route.post("/schedule", makeScheduleValidator,MakeSchedule)
route.put("/schedule", editScheduleValidator, editSchedule)
route.get("/random", getRandomFood)
module.exports = route
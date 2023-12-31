const { getFoods, filterFoods, AddFoodToMenu, deleteFoodFromMenu, getUserMenu, MakeSchedule, editSchedule, getUserSchedule, getDayFood, getProfile, editFoodDay } = require("../controllers/user")
const { makeScheduleValidator, editScheduleValidator } = require("../validator/user")

const route = require("express").Router()

route.get("/", getProfile)
route.get("/food", getFoods)
route.get("/foods", filterFoods)
route.get("/menu", getUserMenu)
route.post("/menu", AddFoodToMenu)
route.delete("/menu/:food_id", deleteFoodFromMenu)
route.get("/schedule", getUserSchedule)
route.post("/schedule", makeScheduleValidator,MakeSchedule)
route.put("/schedule", editScheduleValidator, editSchedule)
route.get("/day/food", getDayFood)
route.put("/day/food", editFoodDay)


module.exports = route
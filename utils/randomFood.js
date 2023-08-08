const ApiError = require("../middleware/apiError")
const Menu = require("../model/Menu")
const Schedule = require("../model/Schedule")

module.exports = async(id) => {
    try {
        const userMenu = await Menu.findOne({ user: id })
        const userSchedule = await Schedule.findOne({ user: id })
        if (!userSchedule || !userMenu) throw new ApiError("User Menu Or Schedule Not Found", 404)
        if (userSchedule.days.includes((new Date(Date.now())).getDay())) {
            const timeStr = userSchedule.break_from;
            const [hours, minutes, meridian] = timeStr.split(/[:\s]/);
            const hours24 = meridian === 'PM' ? parseInt(hours, 10) + 12 : parseInt(hours, 10); 
            const isoTimeStr = `${hours24.toString().padStart(2, '0')}:${minutes}:00`; 
            const date = new Date(`2000-01-01T${isoTimeStr}`);
            const break_hour = date.getHours();
            let food;
            let randomDrink = userMenu.drinks[Math.floor(Math.random() * userMenu.drinks.length)] 
            if (break_hour >= 9 && break_hour < 16) {
                if (userMenu.breakFast.length) {
                    food = userMenu.breakFast[Math.floor(Math.random() * userMenu.breakFast.length)]
                }
            } else {
                if (userMenu.lunch.length) {
                    food = userMenu.lunch[Math.floor(Math.random() * userMenu.lunch.length)] 
                }
            }
            return [food, randomDrink]
        }
        else {
            return false
        }
    } catch (error) {
        throw new ApiError(error.message,500)
    }   
}
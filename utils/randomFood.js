const ApiError = require("../middleware/apiError")
const Menu = require("../model/Menu")
const Schedule = require("../model/Schedule")



module.exports = async(id) => {
    try {
        let food = "AS"
        const userMenu = await Menu.findOne({ user: id })
        const userSchedule = await Schedule.findOne({ user: id })
        if (!userSchedule || !userMenu) throw new ApiError("User Menu Or Schedule Not Found", 404)
        if (userSchedule.days.includes((new Date(Date.now())).getDay())) {
            const timeStr = userSchedule.break_from;
            const [hours, minutes, meridian] = timeStr.split(/[:\s]/); // split the string by colon and space
            const hours24 = meridian === 'PM' ? parseInt(hours, 10) + 12 : parseInt(hours, 10); // convert to 24-hour format
            const isoTimeStr = `${hours24.toString().padStart(2, '0')}:${minutes}:00`; // format as ISO-8601 time string
            const date = new Date(`2000-01-01T${isoTimeStr}`);
            const break_hour = date.getHours();
            console.log(break_hour)
            if (break_hour >= 9 && break_hour < 16) {
                if (userMenu.breakFast.length) {
                    console.log("asd")
                }
            } else {
                console.log("Lunch")
            }
        }
        else {
        }
        
        // if (break_hour > 9 && break_hour <= 16) {
        //     let breakFast_Foods = userMenu.breakFast
        //     if (breakFast_Foods.length) {
        //         let random = Math.floor(Math.random() * breakFast_Foods.length)
        //         console.log(userMenu)
        //         console.log(breakFast_Foods.length)
        //     }
        // } else {
        //     if (userMenu.lunch.length) {
        //         let random = Math.floor(Math.random() * userMenu.lunch.length)
        //         console.log(random)
        //     }
        // }
     return food   

    } catch (error) {
        throw new ApiError(error.message,500)
    }   
}
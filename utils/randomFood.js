const Menu = require("../model/Menu")
const Schedule = require("../model/Schedule")



module.exports = async(id) => {
    try {
        const userMenu =  await Menu.findOne({ user: id })
        const userSchedule = await Schedule.findOne({ user: id })
        // if(userSchedule.work_from)
    } catch (error) {
        throw new ApiError(error.message,500)
    }   
}
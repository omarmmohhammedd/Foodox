const Order = require("../model/Order")
const Notification = require("./Notification")
const ApiError = require("../middleware/apiError")
const Schedule = require("../model/Schedule")
module.exports = async () => {
    try {
        await Order.find({ date: { $gte: new Date(Date.now() - 1000 * 60 * 10) } }).populate({ path: "user", select: "email" }).then((orders) => {
            if (orders.length) {
                orders.forEach(async (order) => {
                    await Notification(order.user.email, order.foods.map((food) => food.name && food.name))
                    console.log("Notifaction Sent To Email", order.user.email)
                })
            }
        })
        await Schedule.find({ expired: false }).then((schedules) => {
            if (schedules.length) {
                schedules.map(async (schedule) => {
                    const dif = new Date(Date.now()) - new Date(schedule.createdAt)
                    if (schedule.period === "week") {
                        if (dif / (86400000) > 7) {
                            schedule.expired = true
                            await schedule.save()
                        }
                    } else {
                        if (dif / (86400000) > 30) {
                            schedule.expired = true
                            await schedule.save()
                        }
                    }
                })
            }
        })
    } catch (error) {
        console.log(error)
        throw new ApiError(error.message, 500)
    }
}

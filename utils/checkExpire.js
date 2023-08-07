const Schedule = require("../model/Schedule")

module.exports =async () => {
    await Schedule.find({ expired: false }).then((schedules) => {
        if (schedules.length) {
            schedules.map(async (schedule) => {
                const dif = new Date(Date.now()) - new Date(schedule.createdAt ) 
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
}

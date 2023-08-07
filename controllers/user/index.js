const expressAsyncHandler = require("express-async-handler")
const Food = require("../../model/Food")
const ApiError = require("../../middleware/apiError")
const Menu = require("../../model/Menu")
const Schedule = require("../../model/Schedule")


exports.getFoods = expressAsyncHandler(async (req, res, next) => await Food.find({}).then((foods) => res.json(foods)))

exports.filterFoods = expressAsyncHandler(async (req, res, next) => {
    const { type } = req.query
    switch (type) {
        case 'breakfast':
            return await Food.find({ category: "breakfast", type: "food" }).then(food => res.json({ food }))
        case 'lunch':
            return await Food.find({ category: "lunch", type: "food" }).then(food => res.json({ food }))
        case 'drink':
            return await Food.find({ type: "drink" }).then(food => res.json({ food }))
    }
})

exports.getUserMenu = expressAsyncHandler(async (req, res, next) => {
    await Menu.findOne({user:req.user.id}).then((menu)=>res.json({ menu,exists:menu?true:false }))
})

exports.AddFoodToMenu = expressAsyncHandler(async (req, res, next) => {
    const { foods } = req.body
    let breakFast = []
    let lunch = []
    let drinks = []
    const userMenu = await Menu.findOne({ user: req.user.id })
    foods.map((food) => {
        if (food.type === "drink") {
            if (userMenu) {
                if (userMenu.drinks.length) {
                    if (!(userMenu.drinks.find((drink) => drink._id === food._id))) {
                        drinks.push(food)
                    }
                } else drinks.push(food)
            } else drinks.push(food)
        }
        else if (food.category === "breakfast") {
            if (userMenu) {
                if (userMenu.breakFast.length) {
                    if (!(userMenu.breakFast.find((break_fast) => break_fast._id === food._id))) breakFast.push(food)
                } else breakFast.push(food)
            } else breakFast.push(food)
        }
        else if (food.category === "lunch") {
            if (userMenu) {
                if (userMenu.lunch.length) {
                    if (!(userMenu.lunch.find((lun) => lun._id === food._id))) lunch.push(food)
                } else lunch.push(food)
            } else lunch.push(food)
        }
    })
    if (userMenu) {
        userMenu.breakFast = [...userMenu.breakFast, ...breakFast]
        userMenu.lunch = [...userMenu.lunch, ...lunch]
        userMenu.drinks = [...userMenu.drinks, ...drinks]
        await userMenu.save()
        res.status(201).json({ userMenu })
    }
    else await Menu.create({ user: req.user.id, breakFast, lunch, drinks }).then((menu) => res.status(201).json({ menu })).catch((err) => console.log(err))
})

exports.deleteFoodFromMenu = expressAsyncHandler(async (req, res, next) => {
    const { food_id } = req.params
    await Food.findById(food_id).then(async food => {
        if (!food) return next(new ApiError("Food Not Found", 404))
        if (food.type === "drink") {
            await Menu.findOne({ user: req.user.id }).then(async (user_menu) => {
                if (!user_menu) return next(new ApiError("User Not Have Menu", 404))
                if (user_menu.drinks.length) {
                    if (!(user_menu.drinks.find(drink => drink._id ===food_id && drink))) return next(new ApiError("User Didn't Have This Drink in His Menu", 404))
                    else {
                        user_menu.drinks = user_menu.drinks.filter((drink) => drink._id !== food_id && drink)
                        await user_menu.save()
                        res.sendStatus(200)
                    }
                } else return next(new ApiError("User Didn't Have This Drink in His Menu", 404))
            })
        }
        else if (food.category === "breakfast") {
            await Menu.findOne({ user: req.user.id }).then(async (user_menu) => {
                if (!user_menu) return next(new ApiError("User Not Have Menu", 404))
                if (user_menu.breakFast.length) {
                    if (!(user_menu.breakFast.find(breakfast => breakfast._id === food_id && breakfast))) return next(new ApiError("User Didn't Have This BreakFast in His Menu", 404))
                    else {
                        user_menu.breakFast = user_menu.drinks.filter((breakfast) => breakfast._id !== food_id && breakfast)
                        await user_menu.save()
                        res.sendStatus(200)
                    }
                } else return next(new ApiError("User Didn't Have This BreakFast in His Menu", 404))
            })
        }
        else if (food.category === "lunch") {
            await Menu.findOne({ user: req.user.id }).then(async (user_menu) => {
                if (!user_menu) return next(new ApiError("User Not Have Menu", 404))
                if (user_menu.lunch.length) {
                    if (!(user_menu.lunch.find(lun => lun._id === food_id && lun))) return next(new ApiError("User Didn't Have This lunch in His Menu", 404))
                    else {
                        user_menu.lunch = user_menu.lunch.filter((lun) => lun._id !== food_id && lun)
                        await user_menu.save()
                        res.sendStatus(200)
                    }
                } else return next(new ApiError("User Didn't Have This lunch in His Menu", 404))
            })
        }
    })
})

exports.MakeSchedule = expressAsyncHandler(async (req, res, next) => {
    const { period, work_from, work_to, break_from, break_to } = req.body
    await Schedule.findOne({ user: req.user.id,expired:false }).then(async(exist) => {
        if (exist) return next(new ApiError("User Already Have Schedule", 409))
        else await Schedule.create({ user:req.user.id,period, work_from, work_to, break_from, break_to }).then((schedule) => res.status(201).json({ schedule }))
    })
})

exports.editSchedule = expressAsyncHandler(async (req, res, next) => {
        await Schedule.findOne({ user: req.user.id ,expired:false}).then(async(schedule) => {
        if (!schedule) return next(new ApiError("User Not Have Schedule", 404))
        const { period, work_from, work_to, break_from, break_to } = req.body
            await Schedule.findOneAndUpdate({ user: req.user.id }, { period: period && period, work_from: work_from && work_from, work_to: work_to && work_to, break_from: break_from && break_from, break_to: break_to && break_to }, { new: true }).then((schedule) => res.json({ schedule }))
    })
})

exports.getUserSchedule = expressAsyncHandler(async (req, res, next) => await Schedule.findOne({ user: req.user.id }).then((schedule) => res.json({ schedule,exists: schedule ?true:false }) ))

exports.getRandomFood = expressAsyncHandler(async (req, res, next) => {
    const { id } = req.user
    const userMenu = await Menu.findOne({ user: id })
    const userSchedule = await Schedule.findOne({ user: id }) 
    if (!userSchedule || !userMenu) return next(new ApiError("User Menu Or Schedule Not Found", 404))
    const work_from = parseInt(userSchedule.work_from.split(":")[0])
    const work_to = parseInt(userSchedule.work_to.split(":")[0])
    
})
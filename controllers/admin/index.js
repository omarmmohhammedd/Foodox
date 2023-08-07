const expressAsyncHandler = require("express-async-handler")
const Food = require("../../model/Food")
const ApiError = require("../../middleware/apiError")

exports.addFood = expressAsyncHandler(async (req, res, next) => {
    const { name, price, category, type } = req.body
    const img = req.file && req.file.path
    await Food.create({ name, price, category, type, img }).then((newFood) => res.json({ newFood }))
})

exports.editFood = expressAsyncHandler(async (req, res, next) => {
    const { name, price, category, type } = req.body
    const { food_id } = req.params
    await Food.findById(food_id).then(async(food) => {
        if (!food) return next(new ApiError("Food not found", 404))
        else {
            const img = req.file && req.file.path
            await Food.findByIdAndUpdate(food_id, { name: name && name, price: price && price, category: category && category, type: type && type },{new:true}).then((newFood) => res.json({ newFood }))
        }
    })
   
})

exports.deleteFood = expressAsyncHandler(async (req, res, next) => {
    const { food_id } = req.params
    await Food.findById(food_id).then((food) => {
        if (!food) return next(new ApiError("Food Not Found", 404))
        else Food.findByIdAndDelete(food_id).then(()=>res.sendStatus(200))
    })
})
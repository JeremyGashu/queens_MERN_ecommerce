const mongoose = require('mongoose')

const discountSchema = new mongoose.Schema({
    _id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    percent : {
        type : Number,
        default : 0
    },
    fromDate : {
        type: mongoose.Schema.Types.Date,
        default : Date.now()
    },
    toDate : {
        type: mongoose.Schema.Types.Date,
        default : Date.now()
    }
})

const Discount = module.exports = mongoose.model('Discount', discountSchema)


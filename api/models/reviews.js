const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    _id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    from : {
        type : String,
        default : 'Anonymous'
    },
    review : {
        type : String,
        required : true
    },
    addedOn : {
        type: mongoose.Schema.Types.Date,
        default : Date.now()
    }
})

const Review = module.exports = mongoose.model('Review', reviewSchema)
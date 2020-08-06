const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    _id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    addedOn : {
        type: mongoose.Schema.Types.Date,
        default : Date.now()
    }
})

const Category = module.exports = mongoose.model('Category', categorySchema)
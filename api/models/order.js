const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    _id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    order : {
        type:String,
        required : true
    },
    phoneNo : {
        type : String,
        required : true
    },
    name : {
        type : String,
        default : 'Anonymous'
    },
    deliveryAddress : {
        type : String,
    },
    dateOrdered : {
        type : Date,
        default : Date.now()
    },
    delivered : {
        type : Boolean,
        default : false
    }
})

const Order = module.exports = mongoose.model('Order', orderSchema)
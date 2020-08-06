const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    _id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    order : [
        {
            itemId : {
                type : mongoose.Schema.Types.ObjectId,ref:'Item'
            },
            amount : {
                type : Number,default : 1
            }
        }
    ],
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
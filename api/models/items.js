const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    _id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category',
        default : new mongoose.Types.ObjectId('5f2d419cf88b381a1c5ced34')
    },
    price : {
        type : Number,
        require : true
    },
    description : {
        type : String,
        default : 'No Description Added!'
    },
    review : [{type : mongoose.Schema.Types.ObjectId, ref : 'Review'}],
    onDiscount : {
        type : Boolean,
        default : false
    },
    discountId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Discount'
    },
    addedOn : {
        type : mongoose.Schema.Types.Date,
        default : Date.now()
    },
    amount : {
        type : Number,
        default : 0
    },
    imageName : {
        type : 'String',
        default : 'queesns_logo.jpg'
    }
})

const Item = module.exports = mongoose.model('Item',itemSchema)
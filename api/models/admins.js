const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    _id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    phoneNo : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minlength : 8
    },
    superAdmin : {
        type : Boolean,
        default : false
    }

})

const Admin = module.exports = mongoose.model('Admin', adminSchema)
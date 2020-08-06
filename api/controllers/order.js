const Order = require('../models/order')
const mongoose = require('mongoose')

exports.orders_all = (req, res) => {
    Order.find().populate({path:'order.itemId', componenet : 'Item'})
        .exec()
        .then(result => {
            res.status(200).json({
                count : result.length,
                orders : result
            })
        }).
        catch(err => {
            res.status(404).json({error : err})
        })
}

exports.order_by_id = (req, res) => {
    let id = req.params.order_id
    Order.findById(id).populate({path:'order.itemId', componenet : 'Item'}).
        exec().
        then(order => {
            if(order) {
                res.status(200).json(order)
            }
            else {res.status(404).json({error : 'No Order Found with this ID.'})}
            
        }).
        catch(err => {
            res.status(404).json({error : 'No Order Found with this ID.'})
        })
}

exports.create_order = (req, res) => {
    //some validation needed
    const {name,phoneNo, order,deliveryAddress} = req.body
    if(phoneNo && order) {

        let newOrder = new Order({
            _id : new mongoose.Types.ObjectId(),
            phoneNo,
            order
        })
        if(name) newOrder.name = name
        if(deliveryAddress) newOrder.deliveryAddress = deliveryAddress
        newOrder.save().then(() => {
            res.status(201).json({msg:'Created!',order : newOrder})
        })
    }
    else {
        res.status(401).json({error : 'Incomplete Fields! Required Fields {phoneNo, order...}'})
    }
}

exports.delete_order = (req, res) => {
    let id = req.params.order_id
    try {
       Order.deleteOne({_id : mongoose.Types.ObjectId(id)}).exec().
       then((val => {
           res.status(200).json({msg : 'Deleted!', val})
       }))
    } catch (error) {
        // console.log(error)
        res.status(401).json({error : 'No Order found with this ID'})
    }
}

exports.mark_as_delivered = (req, res) => {
    let id = req.params.order_id
        try {
            Order.updateOne({_id : mongoose.Types.ObjectId(id)},{delivered : true}).exec().
            then((val => {
                res.status(200).json({msg : 'Updated! ', val})
            }))
         } catch (error) {
             res.status(401).json({error : 'No Order found with this ID'})
         }
}


exports.unchecked_orders = (req, res) => {
    Order.find({delivered : false}).populate({path:'order.itemId', componenet : 'Item'})
        .exec()
        .then(result => {
            res.status(200).json({
                count : result.length,
                orders : result
            })
        }).
        catch(err => {
            res.status(404).json({error : err})
        })
}

exports.error_handler = (req, res) => {
    res.status(404).json({
        error : 'Page Not Found!'
    })
}
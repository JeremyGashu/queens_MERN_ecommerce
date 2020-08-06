const Order = require('../models/order')
const mongoose = require('mongoose')

// @Purpose = List all Orders
// @Previlage = No
// @Required fields =  No
// @Optional params = No
// @ Success status code = 200
// @ Faillure Status code = 404
// @Request = GET
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

// @Purpose = Get single order using id
// @Previlage = No
// @Required fields =  order_id
// @Optional params = No
// @ Success status code = 200
// @ Faillure Status code = 404
// @Request = GET
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

// @Purpose = Creating Order
// @Previlage = No
// @Required fields =  phoneNo and order
// @Optional params = address and name
// @ Success status code = 201
// @ Faillure Status code = 400
// @Request = POST
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

// @Purpose = Delete single Order
// @Previlage = Minimal Admin 
// @Required fields =  item_id
// @Optional params = No
// @ Success status code = 200
// @ Faillure Status code = 400
// @Request = DELETE
exports.delete_order = (req, res) => {
    let id = req.params.order_id
    try {
       Order.deleteOne({_id : mongoose.Types.ObjectId(id)}).exec().
       then((val => {
           res.status(200).json({msg : 'Deleted!', val})
       }))
    } catch (error) {
        // console.log(error)
        res.status(400).json({error : 'No Order found with this ID'})
    }
}

// @Purpose = Mark Order as delivered
// @Previlage = Minimal Admin
// @Required fields =  order_id
// @Optional params = No
// @ Success status code = 200
// @ Faillure Status code = 400, 404
// @Request = PATCH
exports.mark_as_delivered = (req, res) => {
    let id = req.params.order_id
        try {
            Order.updateOne({_id : mongoose.Types.ObjectId(id)},{delivered : true}).exec().
            then((val => {
                res.status(200).json({msg : 'Updated! ', val})
            }))
         } catch (error) {
             res.status(400).json({error : 'No Order found with this ID'})
         }
}

// @Purpose = List all uncheked/not delivered orders
// @Previlage = Minimal Admin
// @Required fields =  No
// @Optional params = No
// @ Success status code = 200
// @ Faillure Status code = 404
// @Request = GET
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

// @Purpose = Handling error
// @Previlage = No
// @Required fields =  No
// @Optional params = No
// @ status code = 
exports.error_handler = (req, res) => {
    res.status(404).json({
        error : 'Page Not Found!'
    })
}
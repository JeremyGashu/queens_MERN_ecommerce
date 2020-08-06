const Discount = require('../models/discount')
const mongoose = require('mongoose')

// @Purpose = List all discounts
// @Previlage = No
// @Required fields =  No
// @Optional params = No
// @ Success status code = 200
// @ Faillure Status code = 404
// @Request = GET
exports.discounts_all = (req, res) => {
    Discount.find()
        .exec()
        .then(result => {
            res.status(200).json({
                count : result.length,
                discounts : result
            })
        }).
        catch(err => {
            res.status(404).json({error : err})
        })
}

// @Purpose = Get single discount using id
// @Previlage = No
// @Required fields =  discount_id
// @Optional params = No
// @ Success status code = 200
// @ Faillure Status code = 404
// @Request = GET
exports.discount_by_id = (req, res) => {
    let id = req.params.discount_id
    Discount.findById(id).
        exec().
        then(discount => {
            if (discount) {
                res.status(200).json(discount)
            } else {
                res.status(404).json({error : 'No Discount Found with this ID.'})
            }
        }).
        catch(err => {
            res.status(404).json({error : 'No Discount Found with this ID.'})
        })
}

// @Purpose = Creating Discount
// @Previlage = Minimal Admin
// @Required fields =  percent
// @Optional params = No
// @ Success status code = 201
// @ Faillure Status code = 400
// @Request = POST
exports.create_discount = (req, res) => {
    const {percent} = req.body
    if(percent) {

        if(typeof(percent) == 'number') {
            let newDiscount = new Discount({
                _id : new mongoose.Types.ObjectId(),
                percent,
            })

            newDiscount.save().then(() => {
                res.status(201).json({msg:'Created!',discount : newDiscount})
            })
        }
        else {
            res.status(401).json({error : 'Percent Should Be number type'})
        }   
    }
    else {
        res.status(400).json({error : 'Percent Should Be Provided'})
    }
}

// @Purpose = Delete single Discount
// @Previlage = Minimal Admin 
// @Required fields =  discount_id
// @Optional params = No
// @ Success status code = 200
// @ Faillure Status code = 400
// @Request = DELETE
exports.delete_discount = (req, res) => {
    let id = req.params.discount_id
    try {
       Discount.deleteOne({_id : mongoose.Types.ObjectId(id)}).exec().
       then((val => {
           res.status(200).json({msg : 'Deleted!', val})
       }))
    } catch (error) {
        res.status(400).json({error : 'No Discount found with this ID'})
    }
}

// @Purpose = Update Discount
// @Previlage = Minimal Admin
// @Required fields =  percent
// @Optional params = No
// @ Success status code = 200
// @ Faillure Status code = 400, 404
// @Request = PATCH
exports.update_discount = (req, res) => {
    const {percent} = req.body
    let id = req.params.discount_id
    if(percent) {
        if(typeof(percent) == 'number') {
            try {
                Discount.updateOne({_id : mongoose.Types.ObjectId(id)},{percent}).exec().
                then((val => {
                    res.status(200).json({msg : 'Updated! ', val})
                }))
             } catch (error) {
                 res.status(400).json({error : 'No Discount found with this ID'})
             }
        }
        else {
            res.status(400).json({error : 'Percent Should Be number type'})
        }
         }
    else {
        res.status(400).json({error : 'Percent Should Be Provided'})
    }
}

// @Purpose = Handling error
// @Previlage = No
// @Required fields =  No
// @Optional params = No
// @ status code = 404
// @Request = No
exports.error_handler = (req, res) => {
    res.status(404).json({
        error : 'Page Not Found!'
    })
}
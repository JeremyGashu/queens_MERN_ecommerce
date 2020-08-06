const Discount = require('../models/discount')
const mongoose = require('mongoose')

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
        res.status(401).json({error : 'Percent Should Be Provided'})
    }
}

exports.delete_discount = (req, res) => {
    let id = req.params.discount_id
    try {
       Discount.deleteOne({_id : mongoose.Types.ObjectId(id)}).exec().
       then((val => {
           res.status(200).json({msg : 'Deleted!', val})
       }))
    } catch (error) {
        res.status(401).json({error : 'No Discount found with this ID'})
    }
}

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
                 res.status(401).json({error : 'No Discount found with this ID'})
             }
        }
        else {
            res.status(401).json({error : 'Percent Should Be number type'})
        }
         }
    else {
        res.status(401).json({error : 'Percent Should Be Provided'})
    }
}

exports.error_handler = (req, res) => {
    res.status(404).json({
        error : 'Page Not Found!'
    })
}
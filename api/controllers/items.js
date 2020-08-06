const mongoose = require('mongoose')
const Item = require('../models/items')
const Discount = require('../models/discount')

exports.get_all_items = (req, res) => {
    Item.find()
        .populate('category discountId')
        .exec()
        .then(result => {
            res.status(200).json({
                count : result.length,
                items : result
            })
        }).
        catch(err => {
            res.status(404).json({error : err})
        })   
}

exports.items_by_id = (req, res) => {
    let id = req.params.item_id
    Item.findById(id)
        .populate('category discountId')
        .exec().
        then(item => {
            if (item) {
                res.status(200).json(item)
            } else {
                res.status(404).json({error : 'No Item Found with this ID.'})
            }
        }).
        catch(err => {
            res.status(404).json({error : 'No Item Found with this ID.'})
        })
}

exports.create_item = (req, res) => {
    const {name, category, price, description} = req.body
    if(name && price) {
        let newItem = new Item({
            _id : new mongoose.Types.ObjectId(),
            name,
            price,
        })
        if(description) newItem.description = description
        if(category) newItem.category = category
        newItem.save().then(() => {
            res.status(201).json({msg:'Created!',item : newItem})
        })
    }
    else {
        res.status(401).json({error : 'Incomplete Fields! Required Fields {name, ,}'})
    }
}

exports.delete_item = (req, res) => {
    let id = req.params.item_id
    try {
       Item.deleteOne({_id : mongoose.Types.ObjectId(id)}).exec().
       then((val => {
           res.status(200).json({msg : 'Deleted!', val})
       }))
    } catch (error) {
        res.status(401).json({error : 'No Item found with this ID'})
    }
}



exports.update_item = (req, res) => {
    let id = req.params.item_id
    const {name, price, description, amount} = req.body

    try {
        Item.findById({_id :mongoose.Types.ObjectId(id)}).exec().then(result => {
            if(result) {
                if(name) {result.name = name}
            if(price && typeof(price) == 'number') {
                result.price = price
            }
            if(description) {result.description = description}
            if(amount && typeof(amount) == 'number') {
                result.price = price
            }
            
            result.save()
            res.status(200).json({msg:'Updated', result})
            }
            else {
                res.status(401).json({error : 'No Item found with this ID'})
            }
        }).catch(err => res.status(401).json({error : 'Invalid Format Encounterd.'}))
    } catch (error) {
        res.status(401).json({error : 'No Item found with this ID'})
    }
}

exports.add_discount_on_item = (req, res) => {
    let id = req.params.item_id
    const {percent} = req.body
    if(percent) {
        if(typeof(percent) == 'number') {
            if(percent <= 100) {
                let newDID = new mongoose.Types.ObjectId();
            let newDiscount = new Discount({
                _id : newDID,
                percent,
            })

            newDiscount.save().then(() => {
                // res.status(201).json({msg:'Created!',discount : newDiscount})
                console.log('Discount Ceated.')
            })
            Item.findById(id)
                .populate('category')
                .exec().
                then(item => {
                    if (item) {
                        // res.status(200).json(item)
                        item.discountId = newDID
                        item.onDiscount = true
                        item.save()
                        res.status(200).json({msg:'Discounted!', item})
                    } else {
                        res.status(404).json({error : 'No Item Found with this ID.'})
                    }
                }).
                catch(err => {
                    res.status(404).json({error : 'No Item Found with this ID.'})
                })
            }
            else {
                res.status(401).json({error : 'Percent should be less than 100'})
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

exports.remove_discount_from_item = (req, res) => {
    let id = req.params.item_id

    try {
        Item.findById({_id :mongoose.Types.ObjectId(id)}).exec().then(result => {
            if(result) {
                if(result.onDiscount) {
                    result.onDiscount = false
                    Discount.deleteOne({_id:result.discountId}).exec()
                        .then(val => console.log(val))
                        .catch(err => res.status(401).json({error : 'No discount found.'}))
                    result.discountId = null
                    result.save()
                    res.status(200).json({msg:'Discount Removed', result})
                }
                else{
                    res.status(200).json({msg:'Not already on discounted list', result})
                }
            }
            else{
                res.status(401).json({error : 'No Item found with this ID'})
            }
        }).catch(err => res.status(401).json({error : 'Invalid Format Encounterd.'}))
    } catch (error) {
        res.status(401).json({error : 'No Item found with this ID'})
    }
}

exports.discounted_items = (req, res) => {
    Item.find({onDiscount : true}).populate('category discountId').exec()
        .then(items => {
            res.status(200).json({
                count : items.length,
                discountedItems : items
            })
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({error : 'No discounted items found.'})
        })
}

exports.newly_added_items = (req, res) => {
    let end = new Date()
    let start = new Date()
    start.setDate(start.getDate() - 3) //before 3 days
    Item.find({addedOn : {
        $gte : start,
        $lte : end
    }}).populate('category discountId').exec()
    .then(items => {
        res.status(200).json({
            count : items.length,
            newItems : items
        })
    }).
    catch(err => {
        console.log(err)
        res.status(404).json({error : 'No new items found..'})
    })
}

exports.search_item_by_name = (req, res) => {
    let {searchParam} = req.query
    if(searchParam) {
        // res.status(200
        var regex = new RegExp(searchParam,'i')
        Item.find({name : regex}).populate('category discountId').exec()
            .then(items => {
                res.json(items)
            })
    }
    else {
        res.status(401).json({error : 'Search param must be provide'})
    }
}

exports.error_handler = (req, res) => {
    res.status(404).json({
        error : 'Page Not Found!'
    })
}
const mongoose = require('mongoose')
const Item = require('../models/items')
const Discount = require('../models/discount')
const Review = require('../models/reviews')
const ItemCategory = require('../utils/category')

// @Purpose = List all items
// @Previlage = No
// @Required fields =  No
// @Optional params = No
// @ Success status code = 200
// @ Faillure Status code = 404
// @Request = GET
exports.get_all_items = (req, res) => {
    Item.find()
        .populate('category discountId review')
        .exec()
        .then(result => {
            res.status(200).json({
                count : result.length,
                items : result
            })
        }).
        catch(err => {
            res.status(404).json({error : true, msg : err})
        })   
}

// @Purpose = Get single items using id
// @Previlage = No
// @Required fields =  item_id
// @Optional params = No
// @ Success status code = 200
// @ Faillure Status code = 404
// @Request = GET
exports.items_by_id = (req, res) => {
    let id = req.params.item_id
    Item.findById(id)
        .populate('category discountId review')
        .exec().
        then(item => {
            if (item) {
                res.status(200).json(item)
            } else {
                res.status(404).json({error : true, msg : 'No Item Found with this ID.'})
            }
        }).
        catch(err => {
            res.status(404).json({error : true, msg : 'No Item Found with this ID.'})
        })
}

// @Purpose = Creating Item
// @Previlage = Minimal Admin 
// @Required fields =  name, price
// @Optional params = category, description
// @ Success status code = 201
// @ Faillure Status code = 400
// @Request = POST
exports.create_item = (req, res) => {
    
    const {name, category, price, description} = req.body

    if(name && price) {
        let newItem = new Item({
            _id : new mongoose.Types.ObjectId(),
            name,
            price,
        })

        if(description) newItem.description = description
        if(category) {
            console.log(ItemCategory[category])
            if(ItemCategory[category]) {
                newItem.category = ItemCategory[category]
                console.log(ItemCategory[category])
            }
            else {
                newItem.category = ItemCategory.OTHERS
                console.log(ItemCategory.OTHERS)
            }
        } 
        if(req.file) {
            if(req.file.filename) {
                newItem.imageName = req.file.filename
            }
            else {
                newItem.imageName = 'queens_image.jpg'
            }
        }
        else {
            newItem.imageName = 'queens_image.jpg'
        }
        newItem.save().then(() => {
            res.status(201).json({msg:'Created!',item : newItem})
        })
    }
    else {
        res.status(400).json({error : true, msg : 'Incomplete Fields! Required Fields {name, price,}'})
    }
}

// @Purpose = Adding Review to an item
// @Previlage = No 
// @Required fields =  item_id  and review
// @Optional params = No
// @ Success status code = 200
// @ Faillure Status code = 400
// @Request = POST
exports.add_review_on_item = (req, res) => {
    let id = req.params.item_id
    const {review} = req.body
    if(review) {
        let revId = new mongoose.Types.ObjectId();
        let newReview = new Review({
            _id : revId,
            review,
        })
        newReview.save().then(() => {
            console.log()
        })

        Item.findById(id).exec()
        .then(item => {
            if(item) {
                item.review = [...item.review, revId]
                item.save()
                res.status(200).json({msg:'Review Added', item})
            }
            else {
                res.status(400).json({error :true, msg : 'No item found with this id'})
            }
        })
    }
    else {
        res.status(400).json({error : true, msg : 'Review Should Be Provided'})
    }
}

// @Purpose = Delete single Item
// @Previlage = Minimal Admin 
// @Required fields =  item_id
// @Optional params = No
// @ Success status code = 200
// @ Faillure Status code = 400
// @Request = DELETE
exports.delete_item = (req, res) => {
    let id = req.params.item_id
    try {
       Item.deleteOne({_id : mongoose.Types.ObjectId(id)}).exec().
       then((val => {
           res.status(200).json({msg : 'Deleted!', val})
       }))
    } catch (error) {
        res.status(400).json({error : true, msg : 'No Item found with this ID'})
    }
}

// @Purpose = Update Item
// @Previlage = Minimal Admin
// @Required fields =  name, category, price, description
// @Optional params = category, description
// @ Success status code = 200
// @ Faillure Status code = 400, 404
// @Request = PATCH
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
                res.status(400).json({error : true, msg : 'No Item found with this ID'})
            }
        }).catch(err => res.status(401).json({error : true, msg : 'Invalid Format Encounterd.'}))
    } catch (error) {
        res.status(400).json({error : true, msg : 'No Item found with this ID'})
    }
}

// @Purpose = Add discount on an item
// @Previlage = Minimal Admin
// @Required fields =  name
// @Optional params = No
// @ Success status code = 200
// @ Faillure Status code = 400, 404
// @Request = PATCH
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
                        res.status(404).json({error : true, msg : 'No Item Found with this ID.'})
                    }
                }).
                catch(err => {
                    res.status(404).json({error : true, msg : 'No Item Found with this ID.'})
                })
            }
            else {
                res.status(400).json({error : true, msg : 'Percent should be less than 100'})
            }
        }
        else {
            res.status(400).json({error : true, msg : 'Percent Should Be number type'})
        }   
    }
    else {
        res.status(400).json({error : true, msg : 'Percent Should Be Provided'})
    }
}

// @Purpose = Remove Discount from an item
// @Previlage = Minimal Admin
// @Required fields =  name
// @Optional params = No
// @ Success status code = 200
// @ Faillure Status code = 400, 404
// @Request = PATCH
exports.remove_discount_from_item = (req, res) => {
    let id = req.params.item_id
    try {
        Item.findById({_id :mongoose.Types.ObjectId(id)}).exec().then(result => {
            if(result) {
                if(result.onDiscount) {
                    result.onDiscount = false
                    Discount.deleteOne({_id:result.discountId}).exec()
                        .then(val => console.log(val))
                        .catch(err => res.status(401).json({error : true, msg : 'No discount found.'}))
                    result.discountId = null
                    result.save()
                    res.status(200).json({msg:'Discount Removed', result})
                }
                else{
                    res.status(200).json({msg:'Not already on discounted list', result})
                }
            }
            else{
                res.status(400).json({error : true, msg : 'No Item found with this ID'})
            }
        }).catch(err => res.status(400).json({error : true, msg : 'Invalid Format Encounterd.'}))
    } catch (error) {
        res.status(400).json({error : 'No Item found with this ID'})
    }
}

// @Purpose = List all Discounted Items
// @Previlage = No
// @Required fields =  No
// @Optional params = No
// @ Success status code = 200
// @ Faillure Status code = 404
// @Request = GET
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
            res.status(404).json({error : true, msg : 'No discounted items found.'})
        })
}

// @Purpose = List all newly added items(items added since three days)
// @Previlage = No
// @Required fields =  No
// @Optional params = No
// @ Success status code = 200
// @ Faillure Status code = 404
// @Request = GET
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
        res.status(404).json({error : true, msg : 'No new items found..'})
    })
}

// @Purpose = Search Items
// @Previlage = No
// @Required fields =  searchParam
// @Optional params = No
// @ Success status code = 200
// @ Faillure Status code = 404
// @Request = GET
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
        res.status(400).json({error : true, msg : 'Search param must be provide'})
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
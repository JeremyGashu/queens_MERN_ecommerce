const Category = require('../models/categories')
const mongoose = require('mongoose')

exports.categories_all = (req, res) => {
    Category.find().select('name addedOn')
        .exec()
        .then(result => {
            res.status(200).json({
                count : result.length,
                categories : result.map(category => {
                    return {
                        _id : category._id,
                        name : category.name,
                        addedOn : category.addedOn,
                        request : {
                            type : 'GET',
                            link : 'http://localhost:5000/categories/' + category._id
                        }
                    }
                })
            })
        }).
        catch(err => {
            res.status(404).json({error : err})
        })
}

exports.category_by_id = (req, res) => {
    let id = req.params.category_id
    Category.findById(id).select(('name addedOn')).
        exec().
        then(category => {
            if (category) {
                res.status(200).json(category)
            } else {
                res.status(404).json({error : 'No Category Found with this ID.'})
            }
        }).
        catch(err => {
            res.status(404).json({error : 'No Category Found with this ID.'})
        })
}

exports.create_category = (req, res) => {
    const {name} = req.body
    if(name) {
        let newCategory = new Category({
            _id : new mongoose.Types.ObjectId(),
            name,
        })
        newCategory.save().then(() => {
            res.status(201).json({msg:'Created!',category : newCategory})
        })
    }
    else {
        res.status(401).json({error : 'Name Should Be Provided'})
    }
}

exports.delete_category = (req, res) => {
    let id = req.params.category_id
    try {
       Category.deleteOne({_id : mongoose.Types.ObjectId(id)}).exec().
       then((val => {
           res.status(200).json({msg : 'Deleted!', val})
       }))
    } catch (error) {
        res.status(401).json({error : 'No Category found with this ID'})
    }
}

exports.update_category = (req, res) => {
    const {name} = req.body
    let id = req.params.category_id
    if(name) {
        try {
            Category.updateOne({_id : mongoose.Types.ObjectId(id)},{name}).exec().
            then((val => {
                res.status(200).json({msg : 'Updated! ', val})
            }))
         } catch (error) {
             res.status(401).json({error : 'No Category found with this ID'})
         }
         } 
    else {
        res.status(401).json({error : 'Name Should Be Provided'})
    }
}

exports.error_handler = (req, res) => {
    res.status(404).json({
        error : 'Page Not Found!'
    })
}
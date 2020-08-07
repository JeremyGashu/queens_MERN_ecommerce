const Category = require('../models/categories')
const mongoose = require('mongoose')

// @Purpose = List all categories
// @Previlage = No
// @Required fields =  No
// @Optional params = No
// @ Success status code = 200
// @ Faillure Status code = 404
// @Request = GET
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
            res.status(404).json({error : true, msg : err})
        })
}

// @Purpose = Get single category using id
// @Previlage = No
// @Required fields =  category_id
// @Optional params = No
// @ Success status code = 200
// @ Faillure Status code = 404
// @Request = GET
exports.category_by_id = (req, res) => {
    let id = req.params.category_id
    Category.findById(id).select(('name addedOn')).
        exec().
        then(category => {
            if (category) {
                res.status(200).json(category)
            } else {
                res.status(404).json({error : true, msg : 'No Category Found with this ID.'})
            }
        }).
        catch(err => {
            res.status(404).json({error : true, msg : 'No Category Found with this ID.'})
        })
}

// @Purpose = Creating Category
// @Previlage = Minimal Admin
// @Required fields =  name
// @Optional params = No
// @ Success status code = 201
// @ Faillure Status code = 400
// @Request = POST
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
        res.status(400).json({error : true, msg : 'Name Should Be Provided'})
    }
}

// @Purpose = Delete single Category
// @Previlage = Minimal Admin 
// @Required fields =  category_id
// @Optional params = No
// @ Success status code = 200
// @ Faillure Status code = 400
// @Request = DELETE
exports.delete_category = (req, res) => {
    let id = req.params.category_id
    try {
       Category.deleteOne({_id : mongoose.Types.ObjectId(id)}).exec().
       then((val => {
           res.status(200).json({msg : 'Deleted!', val})
       }))
    } catch (error) {
        res.status(400).json({error : true, msg : 'No Category found with this ID'})
    }
}

// @Purpose = Update Category
// @Previlage = Minimal Admin
// @Required fields =  name
// @Optional params = No
// @ Success status code = 200
// @ Faillure Status code = 400, 404
// @Request = PATCH
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
             res.status(404).json({error : true, msg : 'No Category found with this ID'})
         }
         } 
    else {
        res.status(400).json({error :true, msg : 'Name Should Be Provided'})
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
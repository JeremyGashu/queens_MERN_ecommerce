const Review = require('../models/reviews')
const mongoose = require('mongoose')


// @Purpose = List all Reviews
// @Previlage = No
// @Required fields =  No
// @Optional params = No
// @ Success status code = 200
// @ Faillure Status code = 404
// @Request = GET
exports.reviews_all = (req, res) => {
    Review.find()
        .exec()
        .then(result => {
            res.status(200).json({
                count : result.length,
                reviews : result
            })
        }).
        catch(err => {
            res.status(404).json({error : true, msg : err})
        })
}

// @Purpose = Get single reviews using id
// @Previlage = No
// @Required fields =  review_id
// @Optional params = No
// @ Success status code = 200
// @ Faillure Status code = 404
// @Request = GET
exports.review_by_id = (req, res) => {
    let id = req.params.review_id
    Review.findById(id).
        exec().
        then(review => {
            if(review) {
                res.status(200).json(review)
            }
            else {res.status(404).json({error : true, msg : 'No Review Found with this ID.'})}
            
        }).
        catch(err => {
            res.status(404).json({error : true, msg : 'No Review Found with this ID.'})
        })
}

// @Purpose = Creating Review
// @Previlage = No
// @Required fields =  review
// @Optional params = No
// @ Success status code = 201
// @ Faillure Status code = 400
// @Request = POST
exports.create_review = (req, res) => {
    const {review} = req.body
    if(review) {
        let newReview = new Review({
            _id : new mongoose.Types.ObjectId(),
            review,
        })
        newReview.save().then(() => {
            res.status(201).json({msg:'Created!',review : newReview})
        })
    }
    else {
        res.status(400).json({error : true, msg : 'Review Should Be Provided'})
    }
}

// @Purpose = Delete single Review
// @Previlage = Minimal Admin
// @Required fields =  category_id
// @Optional params = No
// @ Success status code = 200
// @ Faillure Status code = 400
// @Request = DELETE
exports.delete_review = (req, res) => {
    let id = req.params.review_id
    try {
       Review.deleteOne({_id : mongoose.Types.ObjectId(id)}).exec().
       then((val => {
           res.status(200).json({msg : 'Deleted!', val})
       }))
    } catch (error) {
        res.status(400).json({error : true, msg : 'No Review found with this ID'})
    }
}

// @Purpose = Update Category
// @Previlage = Minimal Admin
// @Required fields =  name
// @Optional params = No
// @ Success status code = 200
// @ Faillure Status code = 400, 404
// @Request = PATCH
exports.update_review = (req, res) => {
    const {review} = req.body
    let id = req.params.review_id
    if(review) {
        try {
            Review.updateOne({_id : mongoose.Types.ObjectId(id)},{review}).exec().
            then((val => {
                res.status(200).json({msg : 'Updated! ', val})
            }))
         } catch (error) {
             res.status(400).json({error : true, msg :'No Review found with this ID'})
         }
         } 
    else {
        res.status(400).json({error : true, msg : 'Review Should Be Provided'})
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
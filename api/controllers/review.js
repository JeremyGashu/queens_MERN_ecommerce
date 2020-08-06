const Review = require('../models/reviews')
const mongoose = require('mongoose')

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
            res.status(404).json({error : err})
        })
}

exports.review_by_id = (req, res) => {
    let id = req.params.review_id
    Review.findById(id).
        exec().
        then(review => {
            if(review) {
                res.status(200).json(review)
            }
            else {res.status(404).json({error : 'No Review Found with this ID.'})}
            
        }).
        catch(err => {
            res.status(404).json({error : 'No Review Found with this ID.'})
        })
}

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
        res.status(401).json({error : 'Review Should Be Provided'})
    }
}

exports.delete_review = (req, res) => {
    let id = req.params.review_id
    try {
       Review.deleteOne({_id : mongoose.Types.ObjectId(id)}).exec().
       then((val => {
           res.status(200).json({msg : 'Deleted!', val})
       }))
    } catch (error) {
        res.status(401).json({error : 'No Review found with this ID'})
    }
}

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
             res.status(401).json({error : 'No Review found with this ID'})
         }
         } 
    else {
        res.status(401).json({error : 'Review Should Be Provided'})
    }
}

exports.error_handler = (req, res) => {
    res.status(404).json({
        error : 'Page Not Found!'
    })
}
import React from 'react'
import {useDispatch} from 'react-redux'
import { sendReview } from '../actions/item_actions';
const AddReview = ({id}) => {

    const dispatch =  useDispatch()

    let review;


    const sendReviewFunc = (e) => {
        e.preventDefault()
        dispatch(sendReview(review,id))
       review = ''
       e.target.value=''
    }
    const handleChange = (e) => {
        review = e.target.value
    }

    return <div className="add-review">
        
        <div className="form">
        <p className='review-header' style={{border:'none', textAlign:'center', fontSize:'20px'}}>ADD REVIEW</p>
            <form onSubmit={(e) => {sendReviewFunc(e)}} action="POST">
                <input onChange={handleChange} placeholder='Write your review...' required type="text" name="review" id={id}/>
                <button onSubmit={(e) => {sendReviewFunc(e)}} type='submit'>Send Review</button>
            </form>
        </div>
    </div>
} 

export default  AddReview
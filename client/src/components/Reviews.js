import React from 'react';
import Review from './Review';

const Reviews = ({ reviews }) => {
	if (reviews.length > 0) {
        const reviewsList = reviews.map(review => {
            return <Review review={review} key={review._id} />
        })
		return (
			<div className="reviews-container">
                <p className='review-header'>Reviews</p>
				{reviewsList}
			</div>
		);
	}

	return (
		<div className="reviews-container">
                <p className='review-header'>Reviews</p>
				<p style={{textAlign:'center', color:'#444'}}>No reviews yet.</p>
			</div>
	);
};

export default Reviews;

import React from 'react';
const Review = ({ review }) => {
    const date = new Date(review.addedOn)
	return (
		<div className="review">
            <div className="mechet">
                <span className="reviewer">{review.from}</span>
                <span className="timestamp">{formatDate(date)}</span>
            </div>
			<p className="review-content">{review.review}</p>
		</div>
	);
};

export default Review

const formatDate = (date) => {
    const months = [
        'January', 'Febraury' , 'March', 'April', 'May' , 'June' ,'July', 'August', 'September', 'October', 'November', 'December'
    ]

    const month = months[date.getMonth()]
    date.getMonth()
    
    const day = date.getDate()
    const year = date.getFullYear()
    return `${day} ${month} ${year}`
}
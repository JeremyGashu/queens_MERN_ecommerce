import React from 'react';
import {useSelector} from 'react-redux'

const Bill = props => {
    const cart = useSelector(state => state.cart)
    const items = useSelector(state => state.items)

    
    let formatted = cart.map(cart => {
        let item = items.find(item => {
            return cart.itemId === item._id;
        });
        return {
            item,
            amount: cart.amount,
        };
    });
    let bill = 0;
    formatted.forEach(element => {
        if(element.item.onDiscount) {
            bill += (element.item.price - (element.item.price * element.item.discountId.percent / 100)) * element.amount
        }
        else{
            bill += element.item.price * element.amount
        }
    });
    
    if(cart) {
        return (
		<div className="bill">
			<div className="bill-container">
				<p>Items in number:</p>
				<p className="bill-price">{cart.length}</p>
			</div>
			<div className="bill-container">
				<p>Bill in ETB:</p>
				<p className="bill-price">{`${bill} ETB`}</p>
			</div>
		</div>
	);
    }
    return null
	
};

export default Bill;

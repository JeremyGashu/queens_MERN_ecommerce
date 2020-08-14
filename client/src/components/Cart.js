import React from 'react';
import {useDispatch} from 'react-redux'
import { removeFromCart } from '../actions/item_actions';

const Cart = ({ cart }) => {
	const dispatch = useDispatch()
	let oldPrice;
	let discountedPrice;
	if (cart.item.onDiscount) {
		oldPrice = cart.item.price;
		discountedPrice = cart.item.price - (cart.item.price * cart.item.discountId.percent) / 100;
	}

	const validatAmount = (e) => {
		console.log(typeof(e.target.value))
	}

	return (
		<div className="cart">
			<div className="name-price">
				<p>{`${cart.item.name}`}</p>
				{!cart.item.onDiscount ? (
					<div>
						<span>{`${cart.item.price}ETB`}</span>
					</div>
				) : (
					<div>
						<span className="old-price">{`${oldPrice} ETB  `} </span>{' '}
						<span className="new-price"> {`${discountedPrice} ETB`}</span>
					</div>
				)}
			</div>

			<div className="amounnt-box">
				<input onChange={validatAmount}
					style={{
						outline: 'none',
						border: '1px solid rgba(224, 224, 224, 0.9)',
						padding: '10px',
						margin: '5px',
						width: '80px',
					}}
					type="number"
					min={1}
					name="amount"
				/>
			</div>

			<div className="amount">
				<p>
					<span>x </span>
					<span>{cart.amount}</span>
				</p>
			</div>
			<div className="delete-btn">
				<button onClick={() => {dispatch(removeFromCart(cart.item._id))}}>Delete</button>
			</div>
		</div>
	);
};

export default Cart;

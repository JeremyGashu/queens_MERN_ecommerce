import React from 'react';
import '../item_detail.css';
import { useSelector } from 'react-redux';
import add_to_cart_image from '../assets/images/cart-arrow-down.svg';
import Reviews from './Reviews';
import AddReview from './AddReview';
import {useDispatch} from 'react-redux'
import { addToCart } from '../actions/item_actions';

const ItemDetail = props => {
	const dispatch = useDispatch()
	const items = useSelector(state => state.items);
	let item;
	if (items) {
		item = items.filter(item => {
			return item._id === props.match.params.item_id;
		});
	}

	if (item) {
		if (item.length > 0) {
			let oldPrice
			let discountedPrice
			if(item[0].onDiscount) {
				oldPrice = item[0].price
				discountedPrice = item[0].price - (item[0].price * item[0].discountId.percent / 100)
			}
			return (
				<div>
					<div className="detail-container">
						<div className="item-detail">
							<div className="item-image">
								<img src={`/uploads/${item[0].imageName}`} alt="" />
							</div>
							{!item[0].onDiscount ? (
								<div className="price">
									<span>{item[0].price}</span>
								</div>
							) : (
								<div className="price">
									<span className="old-price">{`${oldPrice} ETB  `} </span>{' '}
									<span className="new-price"> {`${discountedPrice} ETB`}</span>
								</div>
							)}
							<p className="item-name">{item[0].name}</p>
							<div className="cart-detail">
								<div
									onClick={() => dispatch(addToCart(item[0]._id))}
									className="zoomable"
								>
									<span style={{ marginRight: '10px', fontWeight: 'bold' }}>ADD TO CART</span>
									<img src={add_to_cart_image} alt="Add to cart" />
								</div>
							</div>
							<div className="decription">
								<h4 style={{ color: '#444', fontSize: '14px', textAlign: 'center', margin: '10px' }}>
									{item[0].description}
								</h4>
							</div>
						</div>

						<Reviews reviews={item[0].review} />
					</div>
					<AddReview id={item[0]._id} />
				</div>
			);
		}
	}
	return (
		<div>
			<p>No item found.</p>
		</div>
	);
};

export default ItemDetail;

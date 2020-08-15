import React from 'react'
import '../item.css'
import list_image from '../assets/images/th-list.svg'
import add_to_cart_image from "../assets/images/cart-arrow-down.svg"
import {NavLink} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { addToCart } from '../actions/item_actions';

const Item = ({item}) => {
	const dispatch = useDispatch()
	if(!item.onDiscount) {
		return (
		<div className="item">
			<div className="zoomable item-image-container">
				<img src={`/uploads/${item.imageName}`} alt="" />
			</div>
			<div className="price">
				<span>{`${item.price} ETB`}</span>
			</div>
			<p className="item-name">{item.name}</p>
			<div className="detail-and-cart-container">
				<div  onClick={() => {console.log('DETAIL');
				}} className="zoomable more-img">
					<NavLink to={`/items_detail/${item._id}`} ><img src={list_image} alt="Detail" /></NavLink>
				</div>	

				<div onClick={() => dispatch(addToCart(item._id))} className="zoomable add-to-cart-img">
					<img src={add_to_cart_image} alt="Add to cart" />
				</div>
			</div>
		</div>
	)
	}
	return null
	
}

export default Item

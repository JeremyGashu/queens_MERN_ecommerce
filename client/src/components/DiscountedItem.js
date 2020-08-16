import React from 'react';
import item_image from '../assets/images/agelgil.jpg'
import list_image from '../assets/images/th-list.svg'
import {NavLink} from 'react-router-dom'
import '../discounted.css'
import add_to_cart_image from "../assets/images/cart-arrow-down.svg"
import {useDispatch} from 'react-redux'
import { addToCart } from '../actions/item_actions';

const DiscountedItem = ({item}) => {
	const dispatch = useDispatch()
	const oldPrice = item.price
	const discountedPrice = item.price - (item.price * item.discountId.percent / 100)
	
	return (
		<div className="item">
			<div className="zoomable item-image-container">
			<img src={`/uploads/${item.imageName}`} alt="" />
			</div>
			<div className="price">
				<span className="old-price">{`${oldPrice} ETB  `} </span> <span className="new-price"> {`${discountedPrice} ETB`}</span>
			</div>

			<p className="item-name">{item.name}</p>
			<div className="detail-and-cart-container">
				<div  onClick={() => {
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

export default DiscountedItem
import React from 'react';
import '../category.css'
import {useDispatch} from 'react-redux'
import { selectCategory, exitSearch } from '../actions/item_actions';

const Category = props => {
	let extraClass = props.collapsed ? 'collapsed' : 'released'
	const dispatch = useDispatch()


	const handleCategChange = (e) => {
		e.preventDefault()
		const category = e.target.attributes.category.nodeValue
		dispatch(selectCategory(category))
		dispatch(exitSearch())
		
	}
	return (
		
		<div className={`categories-container ${extraClass}`}>
			<ul>
				{/* <li>
					<a category='NEW' href="/">Newly Added</a>
				</li> */}
				<li category='ALL' onClick = {handleCategChange}>
					<a category='ALL' onClick = {handleCategChange}  href="/">ALL ITEMS</a>
				</li>
				<li category='ANIMAL PRODUCTS' onClick = {handleCategChange}>
					<a category='ANIMAL PRODUCTS' onClick = {handleCategChange} href="/">Animal Products</a>
				</li>
				<li category='ELECTRONICS' onClick = {handleCategChange}>
					<a category='ELECTRONICS' onClick = {handleCategChange} href="/">Electronics</a>
				</li>
				<li category='BEVERAGES' onClick = {handleCategChange}>
					<a category='BEVERAGES' onClick = {handleCategChange} href="/">Beverages</a>
				</li>
				<li category='HOUSEHOLDS' onClick = {handleCategChange}>
					<a category='HOUSEHOLDS' onClick = {handleCategChange} href="/">Households</a>
				</li>
				<li category='SANITARY' onClick = {handleCategChange}>
					<a category='SANITARY' onClick = {handleCategChange} href="/">Sanitary</a>
				</li>
				<li category='FOODS' onClick = {handleCategChange}>
					<a category='FOODS' onClick = {handleCategChange} href="/">Foods</a>
				</li>
				<li category='COSMOTICS' onClick = {handleCategChange}>
					<a category='COSMOTICS' onClick = {handleCategChange} href="/">Cosmotics</a>
				</li>
				<li category='OTHERS' onClick = {handleCategChange}>
					<a category='OTHERS' onClick = {handleCategChange} className="active" href="/">
						Others
					</a>
				</li>
			</ul>
		</div>
	);
}

export default Category

import React, { useState} from 'react';
import {useSelector} from 'react-redux'
import Items from './Items';
import Category from './Category';
import DisconutedItems from './DiscountedItems';
import toggleNavBar from '../assets/images/th-list.svg';
import Loading from './Loading';

const Home = props => {
	
	const items = useSelector(state => state.items)
	const error = useSelector(state => state.error)
	const isLoading = useSelector(state => state.isLoading)
	const isSearching = useSelector(state => state.isSearching)
	const selectedCategory = useSelector(state => state.selectedCategory)
	const categorized = useSelector(state => state.categorized)
	const searchResult = useSelector(state => state.searchResult)
	
	
	
	let toBePassedAsItem = selectedCategory === 'ALL' ? items : categorized
	toBePassedAsItem = searchResult ? searchResult : toBePassedAsItem
	

	const [categoryCollapsed, setCategoryCollapsed] = useState(true);
	if(isLoading || isSearching) {
		return <Loading/>
	}
		else if(!isLoading && !error){
			return (<div className="main-container">
			<div onClick={() => {
						setCategoryCollapsed(!categoryCollapsed);
					}} className="cat-toggler">
				<img
					className="cat-toggler"
					src={toggleNavBar}
					alt=""
				/>
				<span style={{ position: 'absolute', left: '30px' ,color : '#444'}}>Categories</span>
			</div>
			<Category collapsed={categoryCollapsed} />
			<div className="discounted-and-items">
				{searchResult ? null : <DisconutedItems items={items}/>}
				<Items fromSearch={searchResult ? true : false} items={toBePassedAsItem}/>
			</div>
		</div>)
		}

		return <div>
			<p>Error happenned!</p>
		</div>
	
}

export default Home

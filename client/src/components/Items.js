import React from 'react';
import Item from './Item';
import { useSelector } from 'react-redux';

const Items = ({ items ,fromSearch}) => {
	const category = useSelector(state => state.selectedCategory);


	let itemsList = items.map(item => {
		return <Item item={item} key={item._id} />;
	});

	let dom =
		itemsList.length > 0 ? (
			<div className="items-container">
				<p className="centered">{!fromSearch ? `${category}` : `SEARCH RESULT`}</p>
				<div className="items">{itemsList}</div>
			</div>
		) : (
			<div className="items-container">
				<p className="centered">{`${category}`}</p>
				<div className="items">
				<p className="">{!fromSearch ? `No item in this category!` : `No item found.`}</p>
				</div>
			</div>
		);

	return (
		dom
	);
};

export default Items;

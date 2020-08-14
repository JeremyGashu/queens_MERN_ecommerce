import React from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import '../navbar.css'
import {useSelector, useDispatch} from  'react-redux'
import { searchItems, exitSearch } from '../actions/item_actions';
const NavBar = (props) => {

	const cartSize = useSelector(state => state)

	const dispatch = useDispatch()
	let length = cartSize.cart?cartSize.cart.length:0
	
	const handleChange = (e) => {
		e.preventDefault()
		if(e.target.value !== '') {
			dispatch(searchItems(e.target.value))
		}
		else{
			dispatch(exitSearch())
		}
	}

	
    return (
        <nav>

			<h3 className="brand nav-item"><a href="/">Queens Logo</a></h3>
			<div className="search-bar">
				<form onSubmit={handleChange} method="POST">
					<input onChange={handleChange} type="text" placeholder="Search items..." />
				</form>
			</div>
			<ul>
				{/* <img className='nav-toggler' src={toggleNavBar} alt=""/> */}
				<li>
                    <NavLink to='/'>Home</NavLink>
				</li>
				<li>
                    <NavLink to='/cart'>{`Cart(${length})`}</NavLink>
				</li>

				<li>
                    <NavLink to='/contact_us'>Contact Us</NavLink>
				</li>
			</ul>
		</nav>
    )
}

export default withRouter(NavBar)
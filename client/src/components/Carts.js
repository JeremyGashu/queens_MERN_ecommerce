import React from 'react';
import { useSelector , useDispatch} from 'react-redux';
import Cart from './Cart'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import '../cart.css'
import Bill from './Bill';
import { sendOrder, clearCart } from '../actions/item_actions';
import Loading from './Loading';

const Carts = props => {
	const cart = useSelector(state => state.cart);
	const items = useSelector(state => state.items);
	const dispatch = useDispatch()

	let phoneNumber
	
	

	const handleChange = (e) => {
		phoneNumber = e.target.value
	}
    


	if (items && cart) {
		if (cart.length < 1) {
			return (
				<div style={{height:'80vh', display:'flex',flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
					<p style={{fontSize:'30px', textAlign:'center'}}>Your Cart is empty</p>
                    <NavLink to='/'>
					<button className='redirect-btn'>See Items</button>
					</NavLink>
				</div>
			);
		} else {
			let formatted = cart.map(cart => {
				let item = items.find(item => {
					return cart.itemId === item._id;
				});
				return {
					item,
					amount: cart.amount,
				};
			});
			
			const handleSubmit = (e) => {
				e.preventDefault()
				dispatch(sendOrder(JSON.stringify(formatted),phoneNumber))
				setTimeout(() => {
					dispatch(clearCart())
					props.history.push('/')
					
				}, 1000);

				
			}
            
			let each = formatted.map(cart => {
				return <Cart key={cart.item._id} cart={cart} />;
            });
            
            
            

			return (
			    <div className="carts-container">
					{each}
					<Bill />
					<div className="delivery">
						<form onSubmit={handleSubmit} action="post">
							<input onChange={handleChange} required type="tel" placeholder='*Phone Number'/>
							<input type="text" placeholder='Name'/>
							<input type="text" placeholder='Address'/>
							<button onSubmit={handleSubmit} type="submit">Deliver Me</button>
						</form>
					</div>
			    </div>
			)
		}
	}

	return (
		<div style={{height:'85vh', display:'flex',flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
			{/* <p style={{fontSize:'30px', textAlign:'center'}}>Loading cart...</p> */}
			<Loading  />
		</div>
	);
};

export default Carts;

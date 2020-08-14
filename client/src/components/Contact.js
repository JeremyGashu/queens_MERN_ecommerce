import React from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';

const ContactUs = props => {
	return (
		<div className="contact-us">
			<div className="contact">
				<p
					style={{
						color: '#f3f3f3',
						fontWeight: 'bold',
						fontSize: '24px',
						textAlign: 'center',
						borderBottom: '1px solid #444',
						paddingBottom: '30px',
						paddingTop: '30px',
					}}
				>
					Queens Supermarket
				</p>
				<div className="one-contact">
					<div className="content">
						<p>Tlephone</p>
						<p>0912121212</p>
					</div>
				</div>

				<div className="one-contact">
					<div className="content">
						<p>Telegram</p>
						<p>@queenssupermaarket</p>
					</div>
				</div>

				<div className="one-contact">
					<div className="content">
						<p>Email</p>
						<p>queens@gmail.com</p>
					</div>
				</div>
				<div className="one-contact">
					<div className="content">
						<p>Address</p>
						<p>Addis Ababa, Aound Bole</p>
					</div>
				</div>
			</div>

			<div className="feedback">
				<form>
					<input type="text" placeholder="Name" />
					<input required type="email" placeholder="*someemail@mail.com" />
					<textarea required name="feedback" id="feedback" cols="30" rows="10"></textarea>
					<button className="submit-btn">Send Feedback</button>
				</form>
			</div>
			<NavLink to="/">
				<button className="home-btn">BACK TO HOME</button>
			</NavLink>
		</div>
	);
};

export default ContactUs;

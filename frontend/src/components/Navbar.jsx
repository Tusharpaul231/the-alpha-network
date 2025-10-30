import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
	const { user, logout } = useContext(AuthContext);

	return (
		<nav className="navbar">
			<Link to="/" className="logo">The Alpha Network</Link>
			<ul className="nav-links">
				<li><a href="#home">Home</a></li>
				<li><a href="#features">Features</a></li>
				<li><a href="#pricing">Pricing</a></li>
				<li><a href="#testimonials">Reviews</a></li>
				<li><a href="#faq">FAQ</a></li>
			</ul>
			<div className="nav-auth">
				{user ? (
					<>
						<Link to="/dashboard" className="nav-btn">Dashboard</Link>
						<button onClick={logout} className="cta-btn">Logout</button>
					</>
				) : (
					<>
						<Link to="/login" className="nav-btn">Login</Link>
						<Link to="/signup" className="cta-btn">Get Started</Link>
					</>
				)}
			</div>
		</nav>
	);
};

export default Navbar;


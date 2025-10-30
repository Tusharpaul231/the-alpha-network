import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Signup = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		country: '',
		phone: ''
	});
	const [loading, setLoading] = useState(false);
	const { register } = useContext(AuthContext);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const result = await register(formData);
		setLoading(false);
    
		if (result.success) {
			toast.success('Welcome to The Alpha Network!');
		} else {
			toast.error(result.message);
		}
	};

	return (
		<div className="auth-container">
			<div className="auth-box">
				<h2>Join The Alpha Network</h2>
				<p className="auth-subtitle">Start your journey to funded trading</p>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label>Full Name</label>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							placeholder="Enter your full name"
							required
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							placeholder="Enter your email"
							required
						/>
					</div>
					<div className="form-group">
						<label>Password</label>
						<input
							type="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							placeholder="Create a password (min 6 characters)"
							required
							minLength="6"
						/>
					</div>
					<div className="form-group">
						<label>Country</label>
						<input
							type="text"
							name="country"
							value={formData.country}
							onChange={handleChange}
							placeholder="Enter your country"
							required
						/>
					</div>
					<div className="form-group">
						<label>Phone (Optional)</label>
						<input
							type="tel"
							name="phone"
							value={formData.phone}
							onChange={handleChange}
							placeholder="Enter your phone number"
						/>
					</div>
					<button type="submit" className="cta-btn auth-btn" disabled={loading}>
						{loading ? 'Creating account...' : 'Create Account'}
					</button>
				</form>
				<p className="auth-link">
					Already have an account? <Link to="/login">Login</Link>
				</p>
			</div>
		</div>
	);
};

export default Signup;


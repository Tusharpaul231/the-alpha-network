import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	});
	const [loading, setLoading] = useState(false);
	const { login } = useContext(AuthContext);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const result = await login(formData.email, formData.password);
		setLoading(false);
    
		if (result.success) {
			toast.success('Welcome back to The Alpha Network!');
		} else {
			toast.error(result.message);
		}
	};

	return (
		<div className="auth-container">
			<div className="auth-box">
				<h2>Welcome Back</h2>
				<p className="auth-subtitle">Login to your Alpha account</p>
				<form onSubmit={handleSubmit}>
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
							placeholder="Enter your password"
							required
						/>
					</div>
					<button type="submit" className="cta-btn auth-btn" disabled={loading}>
						{loading ? 'Logging in...' : 'Login'}
					</button>
				</form>
				<p className="auth-link">
					Don't have an account? <Link to="/signup">Join Alpha Network</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;


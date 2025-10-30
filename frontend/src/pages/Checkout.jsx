import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { toast } from 'react-toastify';

const Checkout = () => {
	const { type } = useParams();
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();
	const [accountSize, setAccountSize] = useState('10000');
	const [loading, setLoading] = useState(false);

	const prices = {
		'5000': 99,
		'10000': 149,
		'25000': 249,
		'50000': 399,
		'100000': 599,
		'200000': 899
	};

	const challengeNames = {
		'alpha-starter': 'Alpha Starter',
		'alpha-pro': 'Alpha Pro',
		'alpha-elite': 'Alpha Elite',
		'instant-alpha': 'Instant Alpha'
	};

	const handlePurchase = async (e) => {
		e.preventDefault();
    
		if (!user) {
			toast.error('Please login to continue');
			navigate('/login');
			return;
		}

		setLoading(true);
		try {
			const response = await api.post('/challenges', {
				challengeType: type,
				accountSize: parseInt(accountSize),
				price: prices[accountSize]
			});
			toast.success('🎉 Welcome to The Alpha Network! Challenge activated!');
			navigate('/dashboard');
		} catch (error) {
			toast.error(error.response?.data?.message || 'Purchase failed');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="checkout-container">
			<div className="checkout-box">
				<h2>Join The Alpha Network</h2>
				<h3>{challengeNames[type] || type.replace(/-/g, ' ').toUpperCase()}</h3>
        
				<form onSubmit={handlePurchase}>
					<div className="form-group">
						<label>Select Account Size</label>
						<select value={accountSize} onChange={(e) => setAccountSize(e.target.value)}>
							<option value="5000">$5,000 - ${prices['5000']}</option>
							<option value="10000">$10,000 - ${prices['10000']}</option>
							<option value="25000">$25,000 - ${prices['25000']}</option>
							<option value="50000">$50,000 - ${prices['50000']}</option>
							<option value="100000">$100,000 - ${prices['100000']}</option>
							<option value="200000">$200,000 - ${prices['200000']}</option>
						</select>
					</div>

					<div className="checkout-summary">
						<h4>Order Summary</h4>
						<p>Program: <strong>{challengeNames[type]}</strong></p>
						<p>Account Size: <strong>${parseInt(accountSize).toLocaleString()}</strong></p>
						<p className="checkout-total">Total: <strong>${prices[accountSize]}</strong></p>
					</div>

					<button type="submit" className="cta-btn checkout-btn" disabled={loading}>
						{loading ? 'Processing...' : 'Complete Purchase'}
					</button>
          
					<p className="checkout-note">
						💡 You'll get instant access to your trading account after purchase
					</p>
				</form>
			</div>
		</div>
	);
};

export default Checkout;


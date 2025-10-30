import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';

const Dashboard = () => {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();
	const [challenges, setChallenges] = useState([]);
	const [payouts, setPayouts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!user) {
			navigate('/login');
			return;
		}

		const fetchData = async () => {
			try {
				const [challengesRes, payoutsRes] = await Promise.all([
					api.get('/challenges'),
					api.get('/payouts')
				]);
				setChallenges(challengesRes.data);
				setPayouts(payoutsRes.data);
			} catch (error) {
				toast.error('Failed to load dashboard data');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [user, navigate]);

	if (loading) {
		return <div className="dashboard-loading">Loading your Alpha dashboard...</div>;
	}

	return (
		<div className="dashboard-container">
			<div className="dashboard-header">
				<h1>Welcome back, {user?.name}! 🚀</h1>
				<p>Your Alpha Network Dashboard</p>
			</div>

			<div className="dashboard-stats">
				<div className="stat-card">
					<h3>Active Challenges</h3>
					<p className="stat-value">{challenges.filter(c => c.status === 'active').length}</p>
				</div>
				<div className="stat-card">
					<h3>Total Earnings</h3>
					<p className="stat-value">${user?.totalEarnings || 0}</p>
				</div>
				<div className="stat-card">
					<h3>Pending Payouts</h3>
					<p className="stat-value">{payouts.filter(p => p.status === 'pending').length}</p>
				</div>
			</div>

			<div className="dashboard-section">
				<h2>Your Challenges</h2>
				{challenges.length === 0 ? (
					<div className="empty-state">
						<p>No challenges yet. Ready to join Alpha?</p>
						<a href="/#pricing" className="cta-btn">Start a Challenge</a>
					</div>
				) : (
					<div className="challenges-list">
						{challenges.map(challenge => (
							<div key={challenge._id} className="challenge-item">
								<h3>{challenge.challengeType.replace(/-/g, ' ').toUpperCase()}</h3>
								<p>Status: <span className={`status ${challenge.status}`}>{challenge.status}</span></p>
								<p>Account Size: <strong>${challenge.accountSize.toLocaleString()}</strong></p>
								<p>Current Profit: <strong>${challenge.currentProfit || 0}</strong></p>
								<p>Profit Split: <strong>{challenge.profitSplit}%</strong></p>
							</div>
						))}
					</div>
				)}
			</div>

			<div className="dashboard-section">
				<h2>Payout History</h2>
				{payouts.length === 0 ? (
					<div className="empty-state">
						<p>No payouts yet. Complete a challenge to request your first payout!</p>
					</div>
				) : (
					<div className="payouts-list">
						{payouts.map(payout => (
							<div key={payout._id} className="payout-item">
								<p>Amount: <strong>${payout.amount}</strong></p>
								<p>Method: <strong>{payout.method.toUpperCase()}</strong></p>
								<p>Status: <span className={`status ${payout.status}`}>{payout.status}</span></p>
								<p>Requested: <strong>{new Date(payout.requestedAt).toLocaleDateString()}</strong></p>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Dashboard;


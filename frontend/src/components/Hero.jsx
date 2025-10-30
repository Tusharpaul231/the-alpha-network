import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
	return (
		<section className="hero" id="home">
			<h1>Join The Alpha Network</h1>
			<p>Trade With Up To $1M Capital - 24 Hour Payouts Guaranteed</p>
			<Link to="/signup">
				<button className="cta-btn hero-btn">Start Your Alpha Journey</button>
			</Link>
      
			<div className="stats">
				<div className="stat-item">
					<div className="stat-number">150+</div>
					<div className="stat-label">Countries Served</div>
				</div>
				<div className="stat-item">
					<div className="stat-number">$1M</div>
					<div className="stat-label">Max Funding</div>
				</div>
				<div className="stat-item">
					<div className="stat-number">24Hrs</div>
					<div className="stat-label">Payout Speed</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;


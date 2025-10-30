import React from 'react';
import { Link } from 'react-router-dom';

const PricingCard = ({ name, price, features, popular, slug }) => {
	return (
		<div className={`pricing-card ${popular ? 'popular' : ''}`}>
			{popular && <span className="popular-badge">Most Popular</span>}
			<h3>{name}</h3>
			<div className="price">{price}<span> / one-time</span></div>
			<ul className="pricing-features">
				{features.map((feature, index) => (
					<li key={index}>{feature}</li>
				))}
			</ul>
			<Link to={`/checkout/${slug}`}>
				<button className="cta-btn pricing-btn">Join Alpha</button>
			</Link>
		</div>
	);
};

export default PricingCard;


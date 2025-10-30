import React from 'react';

const Features = () => {
	const features = [
		{
			icon: '⚡',
			title: 'Lightning Fast Payouts',
			description: 'Get paid within 24 hours guaranteed. Average processing time under 2 hours.'
		},
		{
			icon: '💰',
			title: 'Up to 100% Profit Split',
			description: 'Keep up to 100% of your earnings with our industry-leading profit sharing.'
		},
		{
			icon: '🌐',
			title: '24/7 Alpha Support',
			description: 'Expert support team available around the clock for all your trading needs.'
		},
		{
			icon: '📈',
			title: 'Premium Trading Conditions',
			description: 'Tight spreads, no swaps, lightning-fast execution on all major platforms.'
		},
		{
			icon: '🎯',
			title: 'On-Demand Withdrawals',
			description: 'Access your profits instantly with our on-demand payout system.'
		},
		{
			icon: '🔒',
			title: 'Bank-Level Security',
			description: 'Your funds and data protected by enterprise-grade security measures.'
		}
	];

	return (
		<section className="features" id="features">
			<h2 className="section-title">The Alpha Advantage</h2>
			<div className="features-grid">
				{features.map((feature, index) => (
					<div key={index} className="feature-card">
						<div className="feature-icon">{feature.icon}</div>
						<h3>{feature.title}</h3>
						<p>{feature.description}</p>
					</div>
				))}
			</div>
		</section>
	);
};

export default Features;


import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import PricingCard from '../components/PricingCard';
import Testimonial from '../components/Testimonial';
import FAQ from '../components/FAQ';

const Home = () => {
	const pricingPlans = [
		{
			name: 'Alpha Starter',
			slug: 'alpha-starter',
			price: '$99 - $299',
			features: [
				'Profit Split: 80%',
				'Overall Drawdown: 10%',
				'Daily Drawdown: 5%',
				'Profit Target: 10%',
				'Time Limit: Unlimited',
				'Leverage: 1:100'
			],
			popular: false
		},
		{
			name: 'Alpha Pro',
			slug: 'alpha-pro',
			price: '$149 - $499',
			features: [
				'Profit Split: 90%',
				'Overall Drawdown: 8%',
				'Daily Drawdown: 4%',
				'Profit Target: 8%',
				'Time Limit: Unlimited',
				'Leverage: 1:100'
			],
			popular: true
		},
		{
			name: 'Alpha Elite',
			slug: 'alpha-elite',
			price: '$199 - $699',
			features: [
				'Profit Split: 100%',
				'Overall Drawdown: 6%',
				'Daily Drawdown: 3%',
				'Profit Target: 6%',
				'Time Limit: Unlimited',
				'Leverage: 1:100'
			],
			popular: false
		}
	];

	return (
		<>
			<Hero />
			<Features />
			<section className="pricing" id="pricing">
				<h2 className="section-title">Choose Your Alpha Program</h2>
				<div className="pricing-grid">
					{pricingPlans.map((plan, index) => (
						<PricingCard key={index} {...plan} />
					))}
				</div>
			</section>
			<Testimonial />
			<FAQ />
		</>
	);
};

export default Home;


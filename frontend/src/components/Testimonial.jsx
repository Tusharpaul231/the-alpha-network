import React from 'react';

const Testimonial = () => {
	const testimonials = [
		{
			name: 'Michael Chen',
			country: 'United States',
			avatar: 'MC',
			text: 'The Alpha Network changed my trading career. Got my first payout in 3 hours - absolutely incredible!',
			stars: 5
		},
		{
			name: 'Aisha Rahman',
			country: 'Pakistan',
			avatar: 'AR',
			text: 'Best prop firm experience ever. The support team is outstanding and payouts are lightning fast.',
			stars: 5
		},
		{
			name: 'Raj Patel',
			country: 'India',
			avatar: 'RP',
			text: 'Finally found a legitimate prop firm. The Alpha Network delivers on every promise!',
			stars: 5
		},
		{
			name: 'Sophie Martin',
			country: 'Canada',
			avatar: 'SM',
			text: 'Professional, transparent, and reliable. This is what prop trading should be.',
			stars: 5
		},
		{
			name: 'David Okonkwo',
			country: 'Nigeria',
			avatar: 'DO',
			text: 'The Alpha Network is the real deal. Fast payouts, great conditions, amazing support.',
			stars: 5
		},
		{
			name: 'Emma Schmidt',
			country: 'Germany',
			avatar: 'ES',
			text: 'Outstanding platform with the best profit splits in the industry. Highly recommend!',
			stars: 5
		}
	];

	return (
		<section className="testimonials" id="testimonials">
			<h2 className="section-title">Alpha Trader Stories</h2>
			<div className="testimonials-grid">
				{testimonials.map((testimonial, index) => (
					<div key={index} className="testimonial-card">
						<div className="testimonial-header">
							<div className="testimonial-avatar">{testimonial.avatar}</div>
							<div>
								<div className="testimonial-name">{testimonial.name}</div>
								<div className="testimonial-country">{testimonial.country}</div>
							</div>
						</div>
						<div className="stars">{'★'.repeat(testimonial.stars)}</div>
						<p className="testimonial-text">{testimonial.text}</p>
					</div>
				))}
			</div>
		</section>
	);
};

export default Testimonial;


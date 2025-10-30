import React, { useState } from 'react';

const FAQ = () => {
	const [activeIndex, setActiveIndex] = useState(null);

	const faqs = [
		{
			question: 'What is The Alpha Network?',
			answer: 'The Alpha Network is a premier prop trading firm that provides traders with access to substantial capital (up to $1M) to trade without risking their own funds. We evaluate your trading skills and reward profitable traders with generous profit splits.'
		},
		{
			question: 'How do I get funded?',
			answer: 'You can get funded through our evaluation challenges or access instant funding accounts. Simply choose your preferred program, pass the trading objectives, and start earning real profits with our capital.'
		},
		{
			question: 'What is the profit split?',
			answer: 'We offer up to 100% profit split on certain programs - the best in the industry! The exact split depends on your chosen challenge type and performance milestones.'
		},
		{
			question: 'How fast are payouts?',
			answer: 'We guarantee payouts within 24 business hours. Our average processing time is under 2 hours, and we offer on-demand payouts for instant access to your earnings.'
		},
		{
			question: 'What are the trading rules?',
			answer: 'Rules vary by program but generally include profit targets, maximum drawdown limits, and consistency requirements. All rules are clearly outlined for each challenge type on our pricing page.'
		},
		{
			question: 'Can I trade any strategy?',
			answer: 'Yes! We allow all trading strategies including scalping, day trading, swing trading, and news trading. We believe in giving our traders the freedom to trade their way.'
		}
	];

	const toggleFaq = (index) => {
		setActiveIndex(activeIndex === index ? null : index);
	};

	return (
		<section className="faq" id="faq">
			<h2 className="section-title">Frequently Asked Questions</h2>
			<div className="faq-container">
				{faqs.map((faq, index) => (
					<div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
						<div className="faq-question" onClick={() => toggleFaq(index)}>
							<span>{faq.question}</span>
							<span className="faq-toggle">▼</span>
						</div>
						<div className="faq-answer">
							<p>{faq.answer}</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default FAQ;


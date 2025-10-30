import React from 'react';

const Footer = () => {
	return (
		<footer>
			<div className="footer-content">
				<div className="footer-brand">
					<h3>The Alpha Network</h3>
					<p>Empowering traders worldwide</p>
				</div>
				<div className="footer-links">
					<div className="footer-section">
						<h4>Company</h4>
						<ul>
							<li><a href="#about">About Us</a></li>
							<li><a href="#contact">Contact</a></li>
							<li><a href="#careers">Careers</a></li>
						</ul>
					</div>
					<div className="footer-section">
						<h4>Legal</h4>
						<ul>
							<li><a href="#terms">Terms of Service</a></li>
							<li><a href="#privacy">Privacy Policy</a></li>
							<li><a href="#risk">Risk Disclosure</a></li>
						</ul>
					</div>
					<div className="footer-section">
						<h4>Support</h4>
						<ul>
							<li><a href="#faq">FAQ</a></li>
							<li><a href="#help">Help Center</a></li>
							<li><a href="#discord">Discord Community</a></li>
						</ul>
					</div>
				</div>
			</div>
			<div className="footer-bottom">
				<p>&copy; 2025 The Alpha Network. All rights reserved.</p>
				<p className="footer-disclaimer">
					Risk Warning: Trading involves substantial risk. Past performance does not guarantee future results.
				</p>
			</div>
		</footer>
	);
};

export default Footer;


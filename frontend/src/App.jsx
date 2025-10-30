import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Checkout from './pages/Checkout';

function App() {
	return (
		<AuthProvider>
			<Router>
				<div className="app">
					<Navbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/checkout/:type" element={<Checkout />} />
					</Routes>
					<Footer />
					<ToastContainer position="top-right" autoClose={3000} />
				</div>
			</Router>
		</AuthProvider>
	);
}

export default App;


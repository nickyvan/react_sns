import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import './App.css';
// check for token
if (localStorage.jwtToken) {
	// set auth token header auth
	setAuthToken(localStorage.jwtToken);
	// decode token to get users data
	const decoded = jwt_decode(localStorage.token);
	// set current user
	store.dispatch(setCurrentUser(decoded));
	// check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		// Log out user
		store.dispatch(logoutUser());
		// clear current profile
		store.dispatch(clearCurrentProfile());
		// redirect to login
		window.location.href = '/login';
	}
}
class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className="App">
						<Navbar />
						<Route exact path="/" component={Landing} />
						<div className="container">
							<Route
								exact
								path="/register"
								component={Register}
							/>
							<Route exact path="/login" component={Login} />
							<Route
								exact
								path="/dashboard"
								component={Dashboard}
							/>
						</div>
						<Footer />
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;

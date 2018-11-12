import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { dispatch } from 'react-redux';

// Register User
export const registerUser = (userData, history) => (dispatch) => {
	axios
		.post('/api/users/register', userData)
		.then((res) => history.push('/login'))
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Login User

export const loginUser = (userData) => (dispatch) => {
	axios
		.post('/api/users/login', userData)
		.then((res) => {
			// save to localStorage
			const { token } = res.data;
			// set to localStorage
			localStorage.setItem('jwtToken', token);
			// set token to auth header
			setAuthToken(token);
			// decode token to get users data
			const decoded = jwt_decode(token);
			// set current user
			dispatch(setCurrentUser(decoded));
		})
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Set logged in user

export const setCurrentUser = (decoded) => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	};
};

// Set log out user

export const logoutUser = () => (dispatch) => {
	// remove token from localStorage
	localStorage.removeItem('jwtToken');
	// remove auth header for future request
  setAuthToken(false);
  // set user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}))
};

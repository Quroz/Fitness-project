import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_FAIL = 'REGISTER_FAIL';
const USER_LOADED = 'USER_LOADED';
const AUTH_ERROR = 'AUTH_ERROR';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAIL = 'LOGIN_FAIL';
const LOGOUT = 'LOGOUT';

function UserState(props) {
	const initalState = {
		token: localStorage.getItem('token'),
		isAuthenticated: null,
		loading: true,
		error: null,
		user: null,
	};

	const [state, dispatch] = useReducer(authReducer, initalState);

	// Register
	const register = async (formData) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		try {
			const res = await axios.post('/api/auth/register', formData, config);

			dispatch({ type: REGISTER_SUCCESS, payload: res.data });
		} catch (error) {
			dispatch({
				type: REGISTER_FAIL,
				payload: error.response.data.msg,
			});
		}
	};
	// Login User
	const login = async (formData) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		try {
			const res = await axios.post('/api/auth/login', formData, config);

			dispatch({ type: LOGIN_SUCCESS, payload: res.data });
		} catch (error) {
			dispatch({
				type: LOGIN_FAIL,
				payload: error.response.data.msg,
			});
		}
	};
	const logout = () => {
		dispatch({ type: LOGOUT });
	};
	return (
		<authContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				user: state.user,
				error: state.error,
				register,
				login,
				logout,
			}}>
			{props.children}
		</authContext.Provider>
	);
}
export default UserState;
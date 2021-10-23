import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import MessageContext from "../contexts/MessageContext";

function Login() {
	const [pushMessage, dropMessage] = useContext(MessageContext);
	const history = useHistory();

	if(localStorage.getItem('refreshToken')!==null){
		history.push('/dashboard/todos');
	}

	const signIn = async event => {
		event.preventDefault();
		try {
			let response = await axios.post(`${process.env.REACT_APP_API}/users/login`, {
				username: event.target.username.value,
				password: event.target.password.value
			});

			localStorage.setItem('authToken', response.data.authToken);
			localStorage.setItem('refreshToken', response.data.refreshToken);

			history.push('/dashboard');
		} catch (error) {
			pushMessage({
				type: 'error', 
				content: error.response.data.message
			});
		}
	}

	return (
		<div className="wrapper">
			<h1>Sign in</h1>
			<form onSubmit={signIn}>
				<input type="text" id="username" placeholder="Username"/>
				<br />
				<input type="password" id="password" placeholder="password"/>
				<br />
				<input type="submit" id="signin" className="btn" value="Sign in"/>
			</form>
		</div>
	)
}

export default Login;
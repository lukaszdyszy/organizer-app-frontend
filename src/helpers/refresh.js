import axios from "axios";

function refresh() {
	if(!localStorage.getItem('refreshToken')){
		throw new Error('You are not logged in');
	}
	axios({
		url: `${process.env.REACT_APP_API}/users/refresh`,
		method: 'post',
		data: {
			refreshToken: localStorage.getItem('refreshToken')
		}
	}).then(response => {
		localStorage.setItem('authToken', response.body.token);
		return;
	}).catch(error => {
		throw new Error(error.response.data.message);
	});
}

export default refresh;
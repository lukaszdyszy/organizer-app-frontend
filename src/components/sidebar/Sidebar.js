import { useState, useContext } from "react";
import { useHistory, NavLink } from "react-router-dom";
import MessageContext from "../../contexts/MessageContext";
import axios from "axios";
import './Sidebar.scss';
import jwt from "jsonwebtoken";

function Sidebar() {
	const [open, toggle] = useState(false);

	const history = useHistory();

	const [pushMessage, dropMessage] = useContext(MessageContext);
	const logOut = () => {
		axios.post(`${process.env.REACT_APP_API}/users/logout`, {
			refreshToken: localStorage.getItem('refreshToken')
		}).then(response => {
			localStorage.removeItem('refreshToken');
			localStorage.removeItem('authToken');
			history.push('/');
		}).catch(error => {
			pushMessage({
				type: 'error',
				content: error.response.data.message
			});
		});
	}

	return (
		<div className="sidebar">
			<div className={`menu-toggler ${open ? "open" : ""}`} onClick={() => {toggle(!open);}}>
				<div className="hamburger-bar top"></div>
				<div className="hamburger-bar middle"></div>
				<div className="hamburger-bar bottom"></div>
			</div>
			<aside className={`sidebar-content ${open ? "open" : ""}`}>
				<h1 className="username">
					{jwt.decode(localStorage.getItem('authToken')).username}
				</h1>
				<div className="menu">
					<NavLink to="/dashboard/todos">Todos</NavLink>
				</div>
				<div className="logout-btn">
					<button onClick={logOut} className="btn">log out</button>
				</div>
			</aside>
		</div>
	)
}

export default Sidebar;
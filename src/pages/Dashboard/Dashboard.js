import { Route, useHistory } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";

import Todos from "../Todos/Todos";

import './Dashboard.scss';

function Dashboard() {
	const history = useHistory();
	
	if(!localStorage.getItem('refreshToken')){
		history.push('/');
	}

	return (
		<div className="page">
			<Sidebar />
			<Route path="/dashboard/todos" exact>
				<Todos />
			</Route>
			<Route path="/dashboard/notes" exact>
				notes
			</Route>
		</div>
	)
}

export default Dashboard;
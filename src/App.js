import { useState } from "react";
import {Route, Switch, BrowserRouter, useHistory} from 'react-router-dom';
import './App.scss';
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import MessageContext from "./contexts/MessageContext";
import Message from "./components/message/Message";

function App() {
	const [messages, updateMessages] = useState([]);
	const [id, incrementId] = useState(0);

	const pushMessage = msg => {
		msg.id = id;
		incrementId(id+1);
		updateMessages([...messages, msg]);
	}
	const dropMessage = msgid => {
		const newMsgs = messages.map(el => {
			if(el.id!==msgid){
				return el;
			}
		});
		newMsgs.splice(newMsgs.indexOf(undefined), 1);
		updateMessages(newMsgs);
	}

	return (
		<div className="App theme-dark">
			<MessageContext.Provider value={[pushMessage, dropMessage]}>
				<div className="messages">
					{
						messages.map(msg => {
							return (
								<Message key={msg.id} message={msg}/>
							)
						})
					}
				</div>
				<BrowserRouter>
					<Switch>
						<Route path="/" exact>
							<Login />
						</Route>
						<Route path="/dashboard">
							<Dashboard />
						</Route>
					</Switch>
				</BrowserRouter>
			</MessageContext.Provider>
		</div>
	);
}

export default App;

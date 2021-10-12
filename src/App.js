import { useState, useEffect } from "react";
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import './App.scss';
import Login from "./pages/Login";
import MessageContext from "./contexts/MessageContext";
import Message from "./components/message/Message";

function App() {
	const [messages, updateMessages] = useState([{
			id: 12,
			type: 'error', 
			content: 'error 12 message'
		},
		{
			id: 22,
			type: 'success', 
			content: 'error 22 message'
		},
		{
			id: 55,
			type: 'error', 
			content: 'error 55 message'
		},
		{
			id: 2,
			type: 'information', 
			content: 'error 2 message'
		},
		{
			id: 8,
			type: 'success', 
			content: 'error 8 message'
		}
	]);
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
		console.log(newMsgs);
		updateMessages(newMsgs);
	}

	return (
		<div className="App theme-dark">
			<button style={{position: 'fixed', zIndex: 2000}} onClick={
				() => {pushMessage({
					type: 'success', 
					content: 'error message'
				});}
			}>msg</button>
			<MessageContext.Provider value={[pushMessage, dropMessage]}>
				<div className="messages">
					{
						messages.map(msg => {
							return (
								<Message message={msg}/>
							)
						})
					}
				</div>
				<BrowserRouter>
					<Switch>
						<Route path="/" exact>
							<Login />
						</Route>
					</Switch>
				</BrowserRouter>
			</MessageContext.Provider>
		</div>
	);
}

export default App;

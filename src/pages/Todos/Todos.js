import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Todo from "../../components/todo/Todo";
import MessageContext from "../../contexts/MessageContext";

function Todos() {
	const [pushMessage, dropMessage] = useContext(MessageContext);
	const [todoList, updateTodoList] = useState([]);

	const getTodos = () => {
		axios({
			method: 'get',
			url: `${process.env.REACT_APP_API}/todos`,
			headers: {
				'authorization': `Bearer ${localStorage.getItem('authToken')}`
			}
		}).then(response => {
			updateTodoList(response.data);
		}).catch(error => {
			pushMessage({
				type: 'error', 
				content: error.response.data.message
			});
		});
	}

	useEffect(() => {
		getTodos();
	}, []);

	return (
		<div className="todos-container">
			<header>
				<h1>My todo list</h1>
			</header>
			<main>
				{todoList.map(todo => {
					return <Todo todo={todo}/>
				})}
			</main>
		</div>
	)
}

export default Todos;
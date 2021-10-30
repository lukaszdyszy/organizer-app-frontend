import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Todo from "../../components/todo/Todo";
import MessageContext from "../../contexts/MessageContext";
import "./Todos.scss";
import refresh from "../../helpers/refresh";

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

	const addTodo = e => {
		e.preventDefault();
		axios({
			method: 'post',
			url: `${process.env.REACT_APP_API}/todos`,
			headers: {
				'authorization': `Bearer ${localStorage.getItem('authToken')}`
			},
			data: {
				title: e.target.title.value
			}
		}).then(response => {
			e.target.reset();
			getTodos();
		}).catch(error => {
			console.log(error);
			if(error.response.status===403){
				try {
					refresh();
					addTodo();
				} catch (err) {
					pushMessage({
						type: 'error',
						content: err.response.data.message
					});
				}
			}
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
					return <Todo key={todo.id_todo} todo={todo} update={getTodos}/>
				})}

				<form className="add-todo-form" onSubmit={addTodo}>
					<input type="text" id="title" placeholder="New todo..."/>
				</form>
			</main>
		</div>
	)
}

export default Todos;
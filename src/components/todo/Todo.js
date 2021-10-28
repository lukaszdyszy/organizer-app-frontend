import { useState, useContext } from "react";
import axios from 'axios';
import './Todo.scss';
import check from '../../assets/green-check.png';
import MessageContext from "../../contexts/MessageContext";
import refresh from "../../helpers/refresh";
import DropDown from "../dropDown/DropDown";

function Todo(props) {
	const [pushMessage, dropMessage] = useContext(MessageContext);
	const [done, toggleDone] = useState(props.todo.done);

	const toggle = async () => {
		axios({
			url: `${process.env.REACT_APP_API}/todos/${props.todo.id_todo}/toggle`,
			method: 'patch',
			headers: {
				'authorization': `Bearer ${localStorage.getItem('authToken')}`
			}
		}).then(() => {
			toggleDone(!done);
		}).catch(error => {

			// if auth token expired
			if(error.response.status===403){
				try {
					refresh();
					toggle();
				} catch (error) {
					pushMessage({
						type: 'error',
						content: error.response.data.message
					})
				}
			}

			// other errrors
			pushMessage({
				type: 'error',
				content: error.response.data.message
			})
		})
	}

	const remove = () => {
		axios({
			url: `${process.env.REACT_APP_API}/todos/${props.todo.id_todo}`,
			method: 'delete',
			headers: {
				'authorization': `Bearer ${localStorage.getItem('authToken')}`
			}
		}).then(() => {
			props.onDelete();
		}).catch(error => {

			// if auth token expired
			if(error.response.status===403){
				try {
					refresh();
					remove();
				} catch (error) {
					pushMessage({
						type: 'error',
						content: error.response.data.message
					})
				}
			}

			// other errrors
			pushMessage({
				type: 'error',
				content: error.response.data.message
			})
		})
	}

	return (
		<div className={`todo ${done ? 'done' : ''}`} >
			<div className="check-done" onClick={toggle}>
				<img src={check} alt="check" className={`check-icon ${done ? 'done' : ''}`} />
			</div>
			<div className={`title ${done ? 'done' : ''}`}>
				{props.todo.title}
			</div>
			<div className="edit">
				<DropDown dirX="left" dirY="down">
					<button onClick={remove}>delete</button>
				</DropDown>
			</div>
		</div>
	)
}

export default Todo;
import { useState, useContext } from "react";
import axios from 'axios';
import './Todo.scss';
import check from '../../assets/green-check.png';
import MessageContext from "../../contexts/MessageContext";
import refresh from "../../helpers/refresh";
import DropDown from "../dropDown/DropDown";
import DeleteIcon from "../../assets/icon-delete-16x16.png";
import EditIcon from "../../assets/icon-edit-16x16.png";

function Todo(props) {
	const [pushMessage, dropMessage] = useContext(MessageContext);

	const toggle = async () => {

		axios({
			url: `${process.env.REACT_APP_API}/todos/${props.todo.id_todo}/toggle`,
			method: 'patch',
			headers: {
				'authorization': `Bearer ${localStorage.getItem('authToken')}`
			}
		}).then(() => {
			props.update();
		}).catch(error => {

			// if auth token expired
			if(error.response.status===403){
				try {
					refresh();
					toggle();
				} catch (err) {
					pushMessage({
						type: 'error',
						content: err.response.data.message
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
			props.update();
		}).catch(error => {
			console.log(error);
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

	const edit = e => {
		if(e.charCode===13){
			axios({
				url: `${process.env.REACT_APP_API}/todos/${props.todo.id_todo}/edit`,
				method: 'patch',
				headers: {
					'authorization': `Bearer ${localStorage.getItem('authToken')}`
				}, 
				data: {
					title: e.target.value
				}
			}).then(() => {
				props.update();
				e.target.blur();
				pushMessage({
					type: 'information',
					content: 'Edited'
				})
			}).catch(error => {
	
				// if auth token expired
				if(error.response.status===403){
					try {
						refresh();
						toggle();
					} catch (err) {
						pushMessage({
							type: 'error',
							content: err.response.data.message
						})
					}
				}
	
				// other errrors
				pushMessage({
					type: 'error',
					content: error.response.data.message
				})
			});
		}
	}
	
	return (
		<div className={`todo ${props.todo.done ? 'done' : ''}`} >
			<div className="check-done" onClick={toggle}>
				<img src={check} alt="check" className={`check-icon ${props.todo.done ? 'done' : ''}`} />
			</div>
			<div className={`title ${props.todo.done ? 'done' : ''}`}>
				<input 
					type="text" 
					defaultValue={props.todo.title} 
					disabled={props.todo.done ? 'disabled' : ''}
					onKeyPress={edit}
				/>
			</div>
			<div className="edit" style={{display: props.todo.done ? 'none' : 'block'}}>
				<DropDown dirX="left" dirY="down">
					<div className="edit-option" onClick={remove}>
						<img src={DeleteIcon}/>
						<div>Delete</div>
					</div>
				</DropDown>
			</div>
		</div>
	)
}

export default Todo;
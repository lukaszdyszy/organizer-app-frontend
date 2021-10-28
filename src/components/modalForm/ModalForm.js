import './ModalForm.scss';

function ModalForm(props) {
	const sendForm = e => {
		e.preventDefault();
	}

	return (
		<div className={`modal-form ${open ? 'open' : ''}`}>
			<form onSubmit={sendForm}>
				<input type="text" id="title"/>
				<input type="submit" className="btn"/>
			</form>
		</div>
	)
}

export default ModalForm;
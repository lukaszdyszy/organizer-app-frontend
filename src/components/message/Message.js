import { useContext, useEffect } from 'react';
import './Message.scss';
import MessageContext from "../../contexts/MessageContext";
import closeIcon from "../../assets/x-close.png";

function Message(props) {
	const [pushMessage, dropMessage] = useContext(MessageContext);

	useEffect(() => {
		console.log(props);
	}, []);

	return (
		<div className={`message ${props.message.type}`}>
			<div className="content">
				{props.message.content}
			</div>
			<div className="close-icon">
				<img src={closeIcon} alt="" onClick={() => dropMessage(props.message.id)}/>
			</div>
		</div>
	)
}

export default Message;
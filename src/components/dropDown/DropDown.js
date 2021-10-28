import { useState, useEffect } from "react";
import './DropDown.scss';

function DropDown(props) {
	const [open, setOpen] = useState(false);
	const [dropDownStyle, setStyle] = useState({});

	const toggleOpen = () => {
		setOpen(!open);
	}

	useEffect(() => {
		let styleObj = {};

		styleObj.transform = `
		translate(${props.dirX==='left'?'-':''}100%, ${props.dirY==='top'?'-':''}100%) 
		${open ? 'scale(1)' : 'scale(0)'}`;
		styleObj.transformOrigin=`${props.dirY==='down' ? 'top' : 'bottom'} ${props.dirX==='left' ? 'right' : 'left'}`;

		if(props.dirX==='left'){
			styleObj.left=0;
		} else {
			styleObj.right=0;
		}
		if(props.dirY==='down'){
			styleObj.bottom=0;
		} else {
			styleObj.top=0;
		}

		setStyle(styleObj);
	}, [open]);

	return (
		<div className="drop-down-container">
			<div onClick={toggleOpen}>...</div>
			<div 
			className="drop-down" 
			style={dropDownStyle}>
				{props.children}
			</div>
		</div>
	)	
}

export default DropDown;
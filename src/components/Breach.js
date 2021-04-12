import React, { useState } from "react";
import parse from "html-react-parser";
import Modal from "react-modal";

//Styling and Animation
import styled from "styled-components";

const Breach = ({ breachName, breachLogo, breachDescription }) => {
	//MODAL
	var subtitle;
	const [modalIsOpen, setIsOpen] = useState(false);
	function openModal() {
		setIsOpen(true);
	}

	function afterOpenModal() {
		// references are now sync'd and can be accessed.
		subtitle.style.color = "#fff";
	}

	function closeModal() {
		setIsOpen(false);
	}
	//Fin Modal
	return (
		<>
			<StyledBook onClick={openModal}>
				<H1>{breachName}</H1>
				<img src={breachLogo} alt={breachName} />
			</StyledBook>
			<Modal
				isOpen={modalIsOpen}
				onAfterOpen={afterOpenModal}
				onRequestClose={closeModal}
				style={customModalStyles}
				contentLabel="Book Modal"
				ariaHideApp={false}
			>
				<Card>
					<h1 ref={(_subtitle) => (subtitle = _subtitle)}>{breachName}</h1>
					{/* <button onClick={closeModal}>close</button> */}
					<Parse>{parse(breachDescription)}</Parse>
					<img src={breachLogo} alt={breachName} />
				</Card>
			</Modal>
		</>
	);
};

const StyledBook = styled.div`
	min-height: 30vh;

	box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.233);
	text-align: center;
	background-color: #2b2928;
	border-radius: 1rem;
	overflow: hidden;
	transition: 0.5s ease-in;
	&:hover {
		background-color: #525252;
		cursor: pointer;
	}
	img {
		margin-left: auto;
		margin-right: auto;
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
		width: 25%;
		height: 20vh;
		object-fit: contain;
	}
`;

const H1 = styled.h1`
	margin-top: 1rem;
	color: white;
	font-size: 2rem;
`;
const Parse = styled.div`
	margin-top: 1rem;
	padding: 1rem;
	color: white;
	font-size: 1rem;
	a {
		text-decoration: none;
		color: #71c491;
	}
`;

const customModalStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		backgroundColor: "black",
		maxWidth: "90%",
		borderRadius: "1rem",
	},
};
const Card = styled.div`
	box-sizing: border-box;
	max-width: 410px;
	margin: 0 auto;
	padding: 0rem 2rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	img {
		margin-top: 0.5rem;
		width: 25%;
	}
`;

export default Breach;

import axios from "axios";
import React, { useState } from "react";
import sha1 from "sha1";
import styled from "styled-components";

const Passwords = ({ setPassword, password }) => {
	const [response, setResponse] = useState(null);

	const getBreaches = async () => {
		let sha = sha1(password).toUpperCase();
		var prefix = sha.substring(0, 5);
		var suffix = sha.substring(5, sha.length);
		console.log(sha);
		const passwordData = await axios.get(
			`https://api.pwnedpasswords.com/range/${prefix}`
		);
		let hashes = passwordData.data.split("\n");
		let breached = false;

		for (let i = 0; i < hashes.length; i++) {
			let hash = hashes[i];
			let h = hash.split(":");

			if (h[0] === suffix) {
				setResponse(`La contraseña ha sido filtrada ${h[1]} veces 🤯`);
				breached = true;
				break;
			}
		}
		if (!breached) {
			setResponse("La contraseña no ha sido filtrada 👌🏼");
		}
		setPassword({ loading: false, password: passwordData });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		getBreaches();
	};

	return (
		<Card>
			<H1>Verifica si tu contraseña ha sido comprometida</H1>
			<Formdiv>
				<form action="" onSubmit={handleSubmit}>
					<div>
						<Inputblack
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							placeholder={"Contraseña"}
							type="password"
						/>
					</div>
					<Button type="submit">Verificar</Button>
					{response && response === "La contraseña no ha sido filtrada 👌🏼" ? (
						<H1succes>{response}</H1succes>
					) : (
						response && <H1alert>{response}</H1alert>
					)}
				</form>
			</Formdiv>
		</Card>
	);
};

const Card = styled.div`
	margin-top: 3rem;
	margin-bottom: 3rem;
	padding: 0rem 0rem;
	h2 {
		padding: 2rem 0rem;
	}
	p {
		font-size: 2rem;
		color: #7bb4a6;
	}
`;

const H1 = styled.h1`
	border: 4px solid black;
	border-radius: 20px;
	background-color: rgba(255, 255, 255, 0);
	color: black;
	padding: 20px 20px;
	margin: 0% 20%;
	font-size: 2.5rem;
	border-color: black;
	@media (max-width: 600px) {
		font-size: 1.5rem;
		margin: 0% 10%;
	}
`;

const Input = styled.input`
	border-radius: 20px;
	background-color: rgba(255, 255, 255, 0);
	padding: 20px 20px;
	width: 80%;
	margin: 2.5rem 0rem;
	font-size: 1.5rem;
	@media (max-width: 600px) {
		font-size: 1rem;
	}
`;

const Inputblack = styled(Input)`
	border: 4px solid black;
	color: black;
	border-color: black;
`;

const H1succes = styled(H1)`
	border: 4px solid #497e49;
	color: #497e49;
	border-color: #497e49;
`;

const H1alert = styled(H1)`
	border: 4px solid #7e0000;
	color: #7e0000;
	border-color: #7e0000;
`;

const Formdiv = styled.div`
	background-color: #e7e7e7;
`;

const Button = styled.button`
	border: 4px solid black;
	background-color: rgba(43, 41, 40, 0.014);
	font-size: 1.5rem;
	color: black;
	padding: 10px 20px;
	border-color: black;
	color: black;
	margin-bottom: 2.5rem;
	transition: 0.5s ease-in;
	&:hover {
		cursor: pointer;
		background-color: #a5a5a5;
	}
`;

export default Passwords;

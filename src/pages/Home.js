import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import Breach from "../components/Breach";
import ReactLoading from "react-loading";

const Home = ({ setAppState, appState }) => {
	const [account, setAccount] = useState(false);
	const [load, setLoad] = useState(true);

	const getBreaches = async () => {
		const breaches = await axios.get(
			`${process.env.REACT_APP_HOST}accbreach/${account}`
		);

		setAppState({ loading: false, breaches: breaches });
		setLoad(true);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoad(false);
		getBreaches();
	};

	return (
		<Card>
			<H1>¿He sido hackeado?</H1>
			<H3>Comprueba si tus datos han sido comprometidos</H3>
			<Formdiv>
				<form action="" onSubmit={handleSubmit}>
					<div>
						<Input
							onChange={(e) => {
								setAccount(e.target.value);
							}}
							type="text"
							placeholder="Correo o
                    número de teléfono (Formato internacional)"
						/>
					</div>

					{!load ? (
						<Loader>
							<ReactLoading
								type={"bars"}
								color={"black"}
								height={"8%"}
								width={"8%"}
							/>
						</Loader>
					) : (
						<Button type="submit">Verificar</Button>
					)}
				</form>
			</Formdiv>

			{!appState.loading && appState.breaches.data.Mensaje ? (
				<h2>Tu cuenta no ha sido vulnerada!</h2>
			) : (
				!appState.loading && (
					<div>
						<BreachList>
							<h2>
								Tu cuenta ha sido vulnerada en{" "}
								{appState.breaches.data.length === 1 ? (
									<span>{appState.breaches.data.length} sitio!</span>
								) : (
									<span>{appState.breaches.data.length} sitios!</span>
								)}
							</h2>
							<Breachs>
								{appState.breaches.data.map((breach) => (
									<Breach
										key={breach.Name}
										breachName={breach.Name}
										breachLogo={breach.LogoPath}
										breachDescription={breach.Description}
									></Breach>
								))}
							</Breachs>
						</BreachList>
					</div>
				)
			)}
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

const H3 = styled.h3`
	margin: 1rem 0rem;
`;

const Input = styled.input`
	border: 4px solid black;
	border-radius: 20px;
	background-color: rgba(255, 255, 255, 0);
	color: black;
	padding: 20px 20px;
	width: 80%;
	margin: 2.5rem 0rem;
	font-size: 1.5rem;
	border-color: black;
	@media (max-width: 600px) {
		font-size: 1rem;
	}
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

const BreachList = styled.div`
	padding: 0rem 5rem;
	h2 {
		padding: 2rem 0rem;
	}
	@media (max-width: 600px) {
		padding: 0rem 0.5rem;
		h2 {
			font-size: 2rem;
		}
	}
`;

const Breachs = styled.div`
	/* max-height: 35vh; */
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
	grid-column-gap: 1.5rem;
	grid-row-gap: 3rem;
	@media (max-width: 600px) {
		flex-direction: column;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		grid-column-gap: 0.5rem;
		grid-row-gap: 1.5rem;
	}
`;

const Formdiv = styled.div`
	background-color: #e7e7e7;
`;

const Loader = styled.div`
	display: flex;
	justify-content: center;
`;

export default Home;

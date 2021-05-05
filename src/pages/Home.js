import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Breach from "../components/Breach";
import ReactLoading from "react-loading";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import es from "react-phone-input-2/lang/es.json";
import Switch from "react-switch";

const Home = ({ setAppState, appState }) => {
	useEffect(() => {
		document.title = "Home - Estrategia y Seguridad";
	}, []);
	const myRef = useRef(null);

	const [account, setAccount] = useState(false);
	const [load, setLoad] = useState(true);
	const [checked, setCheked] = useState(false);

	const getBreaches = async () => {
		const breaches = await axios.get(
			`${process.env.REACT_APP_HOST}accbreach/${account}`
		);

		setAppState({ loading: false, breaches: breaches });
		setLoad(true);
		executeScroll();
		checked
			? window.gtag("event", "Phone number searched", {
					event_category: "Clicks",
					event_label: "Home Page",
			  })
			: window.gtag("event", "Email searched", {
					event_category: "Clicks",
					event_label: "Home Page",
			  });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoad(false);
		getBreaches();
	};
	const handleChange = () => {
		setCheked(!checked);
	};

	const executeScroll = () => myRef.current.scrollIntoView();

	const PhoneInputStyle = {
		border: "4px solid black",
		borderRadius: "20px",
		backgroundColor: "rgba(255, 255, 255, 0)",
		// color: black;
		// padding: "20px 20px",
		width: "80%",
		fontSize: "1.5rem",
		// border-color: black;
	};
	const ContainerPhone = {
		margin: "2.5rem 0rem",
		display: "flex",
		justifyContent: "center",
	};
	const ButtonPhone = {
		position: "relative",
		left: "-290px",
	};
	return (
		<Card>
			<H1>¿He sido hackeado?</H1>
			<H3>Comprueba si tus datos han sido comprometidos</H3>
			<Loader>
				<H3S onClick={() => setCheked(false)}>Correo</H3S>
				<Switch
					checked={checked}
					onChange={handleChange}
					offColor="#8f8f8f"
					offHandleColor="#1b1b1b"
					onColor="#8f8f8f"
					onHandleColor="#1b1b1b"
					handleDiameter={30}
					uncheckedIcon={false}
					checkedIcon={false}
					boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
					activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
					height={20}
					width={48}
					className="react-switch"
					id="material-switch"
				/>
				<H3S onClick={() => setCheked(true)}>Teléfono</H3S>
			</Loader>
			<Formdiv ref={myRef}>
				<form action="" onSubmit={handleSubmit}>
					<div>
						{checked ? (
							<PhoneInput
								country={"gt"}
								localization={es}
								inputStyle={PhoneInputStyle}
								containerStyle={ContainerPhone}
								buttonStyle={ButtonPhone}
								specialLabel={""}
								placeholder={"Ingresa tu número"}
								inputProps={{
									required: true,
									autoFocus: true,
								}}
								onChange={(e) => {
									setAccount(e);
								}}
							/>
						) : (
							<Input
								onChange={(e) => {
									setAccount(e.target.value);
								}}
								type="text"
								required
								placeholder="Correo o
                    Nombre de la cuenta"
							/>
						)}
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
const H3S = styled(H3)`
	margin: 1rem 1rem;
	cursor: pointer;
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
	/* background-color: #e7e7e7; */
`;

const Loader = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export default Home;

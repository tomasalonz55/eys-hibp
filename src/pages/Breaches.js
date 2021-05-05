import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Breach from "../components/Breach";

const Breaches = () => {
	const [breaches, setBreaches] = useState({
		loading: true,
		breaches: [],
	});

	const getBreaches = async () => {
		const breaches = await axios.get(
			`https://haveibeenpwned.com/api/v3/breaches`
		);

		setBreaches({ loading: false, breaches: breaches });
	};
	useEffect(() => {
		getBreaches();
		document.title = "Breaches - Estrategia y Seguridad";
	}, []);
	return (
		<Card>
			<H1>Listado de servicios comprometidos</H1>

			{!breaches.loading && (
				<div>
					<BreachList>
						<Breachs>
							{breaches.breaches.data.map((breach) => (
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
	margin-bottom: 1.5rem;
	font-size: 2.5rem;
	border-color: black;
	@media (max-width: 600px) {
		font-size: 1.5rem;
		margin: 0% 10%;
		margin-bottom: 1.5rem;
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
export default Breaches;

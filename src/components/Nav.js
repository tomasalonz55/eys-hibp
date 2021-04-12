import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../img/Blanco.png";

const Nav = ({ existingTokens }) => {
	return (
		<StyledNav>
			<Link id="Logo" to="/">
				<img src={logo} alt="" />
			</Link>

			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/passwords">Contraseñas</Link>
				</li>
			</ul>
		</StyledNav>
	);
};

const StyledNav = styled.nav`
	min-height: 10vh;
	display: flex;
	margin: auto;
	font-family: "Gotham", cursive;
	justify-content: space-between;
	align-items: center;
	padding: 0.75rem 10rem;
	background-color: #2b2928;
	position: sticky;
	top: 0;
	z-index: 10;
	a {
		color: white;
		text-decoration: none;
	}
	ul {
		display: flex;
		list-style: none;
		align-items: center;
	}
	li {
		padding-left: 4rem;
		position: relative;
	}
	img {
		display: block;
		margin-left: 0%;
		margin-right: auto;
		width: 10%;
	}
	@media (max-width: 1080px) {
		flex-direction: column;
		padding: 0.5rem 0.5rem;
		#Logo {
			display: center;
			margin: 0.5rem;
			img {
				display: block;
				margin-left: auto;
				margin-right: auto;
				width: 10%;
			}
		}
		ul {
			padding: 0.5rem;
			justify-content: space-around;
			width: 100%;
			li {
				padding: 0;
			}
		}
	}
`;

export default Nav;

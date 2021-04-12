import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Passwords from "./pages/Passwords";
import Breaches from "./pages/Breaches";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import GlobalStyles from "./components/GlobalStyles";

function App() {
	const [appState, setAppState] = useState({
		loading: true,
		breaches: null,
	});
	const [password, setPassword] = useState({
		loading: true,
		password: null,
	});

	return (
		<div className="App">
			<GlobalStyles />
			<Router>
				<Nav />
				<Route
					exact
					path="/"
					render={(props) => (
						<Home {...props} setAppState={setAppState} appState={appState} />
					)}
				/>
				<Route
					exact
					path="/passwords"
					render={(props) => (
						<Passwords
							{...props}
							setPassword={setPassword}
							password={password}
						/>
					)}
				/>
				<Route exact path="/breaches" render={() => <Breaches />} />
				<Footer />
			</Router>
		</div>
	);
}

export default App;

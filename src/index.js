import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import GA4React from "ga-4-react";
const ga4react = new GA4React("G-5LR70VDTFC");

(async (_) => {
	await ga4react.initialize();

	ReactDOM.render(
		<React.StrictMode>
			<App ga4react={ga4react} />
		</React.StrictMode>,
		document.getElementById("root")
	);
})();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

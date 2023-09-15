import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import EventBus from "vertx3-eventbus-client";

function App() {
	useEffect(() => {
		const eb = new EventBus("http://localhost:8080/eventbus");

		// Open connection
		eb.onopen = () => {
			console.log("conexión con eventbus abierta");
			eb.registerHandler("feed", function (error, message) {
				console.log("received a message: " + JSON.stringify(message));
				setNotification(message.body.tittle);
				setTimeout(() => setNotification(null), 3000); //)
			});
			eb.registerHandler("folios", function (error, message) {
				console.log(message.body)
				setFolios(folios=>[...folios, message.body]);
			});
		};

		// On close connection
		eb.onclose = (param) => {
			console.log("closed", param);
		};
	}, []);
	// Initialize

	const [notification, setNotification] = useState(null);
	const [folios, setFolios] = useState([]);

	return (
		<div className="App">
			<div className="relative bg-[#282c34]">
				{notification ? (
					<div className="absolute m-10 py-2 px-5 bg-black/30 border-black border">
						<h4 className="text-[#44dbf9]">Notificación nueva</h4>
						<span className="text-gray-300">{notification}</span>
					</div>
				) : null}
			</div>
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>Aplicación Receiver</p>
				<table className="table text-md">
					<thead>
						<tr>
							<th>Folios</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody className="text-sm border-t-4">
						{
							folios.length?
							folios.map(({ id, status }, idx) => {
							return (
								<tr key={idx} className="border-b-2 last:border-b-0 p-4 h-11">
									<td>{id}</td>
									<td className="px-4">
										<span className={`${status==="ACTIVO"? "bg-lime-500 text-gray-600": "bg-orange-400"} p-2 rounded`}>{status}</span>
									</td>
								</tr>
							);
						}): null}
					</tbody>
				</table>
			</header>
		</div>
	);
}

export default App;

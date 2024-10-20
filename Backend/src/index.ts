import connectWithDb from "./db";
import server from "./app";
import { webSocketServerInit } from "./ws-Service/ws";

const URI = process.env.MONGO_URI as string;
const port = process.env.PORT || 8000;

if (!URI) {
	throw new Error("MONGO URI IS undefine");
}

connectWithDb(URI)
	.then(() => {
		webSocketServerInit(server);
		server.listen(port, () =>
			console.log("SERVER STARTED AT PORT ::", port),
		);
	})
	.catch((err) => {
		console.log("MONGO DB CONNECTION FAILED ::", err);
	});

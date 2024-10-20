import { WebSocket, WebSocketServer } from "ws";
import Message from "../models/message.model";

const clients: { [key: string]: WebSocket } = {};

const addClient = (message: any, socket: WebSocket) => {
	const { userId } = message;
	clients[userId] = socket;
	console.log(Object.keys(clients));
};

const sendMessageToClient = async (message: any) => {
	console.log("message send");

	Object.keys(clients).forEach((client: string | number) => {
		if (client == message?.to) {
			const socket = clients[message?.to];
			console.log("message send");
			socket.send(
				JSON.stringify({
					to: message?.to,
					from: message?.from,
					content: message?.content,
					sender: message?.sender,
					chatId: message?.chatId,
					createdAt: new Date(Date.now()).toISOString(),
				}),
			);
		}
	});

	await Message.create({
		sender: message?.sender,
		chatId: message?.chatId,
		content: message?.content,
	});
};

export const webSocketServerInit = (server: any) => {
	console.log("web socket init.");

	const ws = new WebSocketServer({ server });

	ws.on("connection", (socket) => {
		console.log("new Client connected");

		socket.on("message", (data: string) => {
			const message = JSON.parse(data);

			console.log("incomming messages", message);

			switch (message.type) {
				case "login":
					addClient(message, socket);
					break;

				case "message":
					sendMessageToClient(message);
					break;

				default:
					break;
			}
		});
	});

	ws.on("close", () => {
		console.log("client disconnect");
	});
};

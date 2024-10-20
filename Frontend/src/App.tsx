import { useEffect, useState } from "react";
import "./App.css";
import Chat from "./components/Chat";
import SearchUser from "./components/searchUser";
import { IAxoisResponse } from "./types/generic";
import axios from "axios";

import { useAppSelector, useAppDispatch } from "./redux/hook";
import {
	setChats,
	addMessageToChat,
	addMessageToRightChat,
} from "./redux/chatSlice";
import Nav from "./components/Nav";
import { useNavigate } from "react-router-dom";

function App() {
	const navigate = useNavigate( );
	const theme = useAppSelector((state) => state.theme.mode);
	const MessageTheme = useAppSelector((state) => state.theme.theme);
	const chats = useAppSelector((state) => state.chats.chats);
	const lastChat = useAppSelector((state) => state.chats.lastChat);
	const dispatch = useAppDispatch();
	const user = JSON.parse(localStorage.getItem("user")!);
	const [webSocket, setWebSocket] = useState<WebSocket | null>();
	const [content, setContent] = useState<string>("");
	const [to, setTo] = useState<string>("");

	if (!user) {
		navigate("/login");
	}

	const fetchChatsHandler = async () => {
		try {
			const res = await axios.get<IAxoisResponse>(
				`${import.meta.env.VITE_BACKEND_URL}/api/chats`,
				{ withCredentials: true }
			);

			const data = res?.data?.data;
			// setChats(data);
			dispatch(setChats(data));
		} catch (error) {
			console.log(error);
		}
	};

	const fetchMessagesHandler = async () => {
		try {
			const res = await axios.get<IAxoisResponse>(
				`${import.meta.env.VITE_BACKEND_URL}/api/messages/${
					lastChat?._id
				}`,
				{ withCredentials: true }
			);

			const data = res?.data?.data;
			dispatch(
				addMessageToChat({
					chatId: lastChat?._id!,
					massages: data,
				})
			);

			// setMessages(data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		fetchChatsHandler();
	}, []);

	useEffect(() => {
		if (lastChat) fetchMessagesHandler();
		setTo(
			(lastChat?.user1?._id == user?._id
				? lastChat?.user2?._id
				: lastChat?.user1?._id)!
		);
	}, [lastChat]);

	useEffect(() => {
		const socket = new WebSocket("ws://localhost:8080");

		socket.onopen = () => {
			socket?.send(JSON.stringify({ type: "login", userId: user?._id }));
			console.log("Connected to WebSocket server");
		};

		socket.onmessage = (e: MessageEvent<any>) => {
			const msg = JSON.parse(e.data);
			console.log("socket", msg);

			dispatch(
				addMessageToRightChat({ chatId: msg?.chatId, message: msg })
			);
		};

		setWebSocket(socket);

		return () => {
			socket.close();
		};
	}, []);

	const sendMessage = () => {
		webSocket?.send(
			JSON.stringify({
				type: "message",
				sender: user?._id,
				from: user?._id,
				chatId: lastChat?._id,
				to,
				content: content,
			})
		);

		dispatch(
			addMessageToRightChat({
				chatId: lastChat?._id!,
				message: {
					_id: `${Date.now()}`,
					sender: user?._id as string,
					chatId: lastChat?._id as string,
					createdAt: new Date(Date.now()).toISOString(),
					updatedAt: new Date(Date.now()).toISOString(),
					content: content,
				},
			})
		);
		setContent("");
	};

	function containsEmoji(input: string): boolean {
		const stringRegex = /[a-zA-Z0-9!@#$%^&*()_+[\]{};':"\\|,.<>\/?`~\-]/;

		const hasString = stringRegex.test(input);

		return hasString;
	}

	const formatDate = (timestamp: any) => {
		const date = new Date(timestamp);
		return date.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		});
	};
	return (
		<>
			<div className={`w-full h-screen ${theme} `}>
				<Nav />
				<div className="w-full h-[90%] flex bg-background ">
					<div className="sidebar bg-background text-foreground border-accent  ">
						<SearchUser />
						{chats?.map((chat: any, idx: number) => (
							<Chat key={idx} conversation={chat} />
						))}
					</div>
					<div className="right-div relative bg-background text-foreground ">
						<div
							className={`w-full h-[90%] flex flex-col overflow-y-auto scrollbar-custom rounded-xl px-8 py-4 ${MessageTheme.bg}`}
						>
							{chats
								?.find((c) => c._id == lastChat?._id)
								?.messages?.map((message: any, idx) => {
									if (!containsEmoji(message?.content)) {
										return (
											<h1
												draggable={true}
												className={`font-semibold text-4xl ${
													message?.sender ===
													user?._id
														? "self-end"
														: "self-start"
												}`}
											>
												{message.content}
											</h1>
										);
									}
									return (
										<div
											draggable={true}
											className={` ${
												message?.sender === user?._id
													? "self-end"
													: "self-start"
											} my-3`}
										>
											<div
												className={`text-foreground p-4 font-semibold text-md my-2 rounded-full shadow-lg text-white bg-gradient-to-tr ${MessageTheme.from} ${MessageTheme.to} ${MessageTheme.via}`}
												key={idx}
											>
												{message?.content}
											</div>
											<h1 className="text-xs px-4">
												{formatDate(message.createdAt)}
											</h1>
										</div>
									);
								})}
						</div>
						<div className="w-full absolute bottom-0 left-0 px-8  h-[10%] flex items-center ">
							<input
								type="text"
								className="w-[75%] text-foreground bg-background mr-[5%] border border-accent p-3 rounded-full"
								placeholder="Type your message here..."
								value={content}
								onChange={(e) => setContent(e.target.value)}
							/>
							<button
								onClick={sendMessage}
								className={` w-[20%] p-3 rounded-full  bg-gradient-to-tr ${MessageTheme.from} ${MessageTheme.to} ${MessageTheme.via}  text-white `}
							>
								Send
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;

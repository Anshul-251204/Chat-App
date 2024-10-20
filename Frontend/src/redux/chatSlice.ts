import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChat, IMessage } from "../types/generic";

interface IInitialState {
	chats: IChat[];
	lastChat: IChat | null;
}

interface AddMessageToChatPayload {
	chatId: string | Number;
	massages: IMessage[];
}

const initialState: IInitialState = {
	chats: [],
	lastChat: null,
};

export const chatSlice = createSlice({
	name: "Chats",
	initialState,
	reducers: {
		setChats: (state, action: PayloadAction<IChat[]>) => {
			state.chats = action.payload;
		},
		setLastChats: (state, action: PayloadAction<IChat>) => {
			state.lastChat = action.payload;
		},
		addMessageToChat: (
			state,
			action: PayloadAction<AddMessageToChatPayload>,
		) => {
			state.chats = state.chats.map((chat) => {
				if (chat._id == action.payload.chatId) {
					return { ...chat, messages: action.payload.massages };
				}
				return { ...chat };
			});
		},
		addMessageToRightChat: (
			state,
			action: PayloadAction<{ chatId: string; message: IMessage }>,
		) => {
			console.log("Payloads", action.payload);

			const chat = state.chats.find(
				(chat) => chat._id == action.payload.chatId,
			);
			chat?.messages?.push(action.payload.message);
		},
	},
});

export const {
	setChats,
	setLastChats,
	addMessageToChat,
	addMessageToRightChat,
} = chatSlice.actions;

export default chatSlice.reducer;

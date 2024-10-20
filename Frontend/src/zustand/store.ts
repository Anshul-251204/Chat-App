import { create } from "zustand";
import { IChat, IMessage } from "../types/generic";

interface StoreState {
	chats: IChat[];
	setChats: (chat: any) => void;
	lastChat: IChat | null;
	setLastChat: (chat: IChat) => void;
	addMessageToChat: (chatId: string, messages: IMessage[]) => void;
	addMessageToRightChat: (chatId: string, messages: any) => void;
	reFetchChats: boolean;
	setRefetchChats: () => void;
}

export const useStore = create<StoreState>((set) => ({
	chats: [],
	setChats: (chats: IChat[]) => set(() => ({ chats: [...chats] })),
	lastChat: null,
	setLastChat: (chat: IChat) => set(() => ({ lastChat: chat })),
	addMessageToChat: (chatId: string, messages: IMessage[]) =>
		set((s) => ({
			chats: s.chats.map((chat) => {
				if (chat._id == chatId) {
					return { ...chat, messages: messages };
				}
				return { ...chat };
			}),
		})),
		addMessageToRightChat: (chatId: string, message: IMessage) => {
			set((state) => {
			  const updatedChats = state.chats.map((chat) => {
				if (chat._id === chatId) {
				  console.log("Updating chat:", chat._id); // For debugging
				  return {
					...chat, // Create a new object for the chat
					messages: [...(chat.messages || []), message], // Create a new array for messages
				  };
				}
				return chat;
			  });
		  
			  // Logging to ensure we're returning a new chats array
			  console.log("Updated chats:", updatedChats);
		  
			  return { chats: updatedChats }; // Return the new chats array
			});
		  },

	reFetchChats: false,
	setRefetchChats: () => set((s) => ({ reFetchChats: !s.reFetchChats })),
}));

import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chatSlice";
import themeReducer from "./themeSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
	key: "root",
	storage,
};

const themePersistedReducer = persistReducer(persistConfig, themeReducer);

export const store = configureStore({
	reducer: {
		chats: chatReducer,
		theme: themePersistedReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

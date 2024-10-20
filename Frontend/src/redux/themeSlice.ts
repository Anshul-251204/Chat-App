import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
	mode: "dark" | "light";
	themes: {
		id: string;
		to: string;
		bg: string;
		from: string;
		via: string;
	}[];
	theme: {
		id: string;
		to: string;
		bg: string;
		from: string;
		via: string;
	};
}

const initialState: IInitialState = {
	mode: "light",
	themes: [
		{
			id: "blue",
			bg: "bg-blue-500/20",
			to: "to-blue-400",
			from: "from-blue-800",
			via: "via-blue-600",
		},
		{
			id: "Violet",
			bg: "bg-violet-500/20",
			to: "to-violet-400",
			from: "from-violet-800",
			via: "via-violet-600",
		},
		{
			id: "Cyan",
			bg: "bg-cyan-500/20",
			to: "to-cyan-400",
			from: "from-cyan-800",
			via: "via-cyan-600",
		},
		{
			id: "Pink",
			bg: "bg-pink-500/20",
			to: "to-pink-400",
			from: "from-pink-800",
			via: "via-pink-600",
		},
		{
			id: "Rose",
			bg: "bg-rose-500/20",
			to: "to-rose-400",
			from: "from-rose-800",
			via: "via-rose-600",
		},
		{
			id: "Teal",
			to: "to-teal-400",
			from: "from-teal-800",
			bg: "bg-teal-500/20",
			via: "via-teal-600",
		},
		{
			id: "Emerald",
			bg: "bg-emerald-500/20",
			to: "to-emerald-400",
			from: "from-emerald-800",
			via: "via-emerald-600",
		},
		{
			id: "Lime",
			bg: "bg-lime-500/20",
			to: "to-lime-400",
			from: "from-lime-800",
			via: "via-lime-600",
		},
	],
	theme: {
		id: "blue",
		bg: "bg-blue-500/20",
		to: "to-blue-400",
		from: "from-blue-800",
		via: "via-blue-600",
	},
};

export const themeSlice = createSlice({
	name: "theme",
	initialState,
	reducers: {
		changeTheme: (state) => {
			if (state.mode === "dark") {
				state.mode = "light";
			} else {
				state.mode = "dark";
			}
		},
		changeMessageTheme: (state, action: PayloadAction<string>) => {
			state.theme = state.themes.find(
				(theme) => theme.id === action.payload,
			)!;
		},
	},
});

export const { changeTheme, changeMessageTheme } = themeSlice.actions;

export default themeSlice.reducer;

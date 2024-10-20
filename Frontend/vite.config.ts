import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		proxy: {
			"/api" : "http://13.236.205.5:8080/",
		},
	},
	plugins: [react()],
});

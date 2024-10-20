/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				background: "rgba(var(--background))",
				foreground: "rgba(var(--foreground))",
				border: "rgba(var(--border))",
				accent: "rgba(var(--accent))",
				"light-accent": "rgba(var(--light-accent))",
				"accent-hover": "rgba(var(--accent-hover))",
			},
			fontFamily: {
				roboto: ["Roboto", "sans-serif"],
			},
			animation: {
				scroll: "scroll 18s linear infinite",
			},
			keyframes: {
				scroll: {
					"0%": { transform: "translateX(100%)" },
					"100%": { transform: "translateX(-100%)" },
				},
			},
			screens: {
				"h-sm": {
					raw: "( max-height : 700px)",
				},
			},
		},
	},
	plugins: [],
};

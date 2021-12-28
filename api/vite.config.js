const { resolve } = require("path");
const { defineConfig } = require("vite");

module.exports = defineConfig({
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, "index.html"),
				error: resolve(__dirname, "./html/error.html"),
				loadingScreen: resolve(__dirname, "./html/loadingScreen.html"),
				matchHistory: resolve(__dirname, "./html/matchHistory.html"),
			},
		},
	},
});

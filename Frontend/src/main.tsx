import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login.tsx";
import Signup from "./components/Signup.tsx";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import RedirectToHome from "./components/RedirectToHome.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/Signup",
		element: <Signup />,
	},
	{
		path: "/:accessToken",
		element: <RedirectToHome />,
	},
]);
createRoot(document.getElementById("root")!).render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<RouterProvider router={router} />
			<Toaster />
		</PersistGate>
	</Provider>
);

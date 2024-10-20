import React, { useState } from "react";
import toast from "react-hot-toast";
import { IAxoisResponse } from "../types/generic";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
	const [userData, setUserData] = useState({
		email: "",
		password: "",
	});
	const navigate = useNavigate();

	const loginHandler = async () => {
		try {
			const res = await axios.post<IAxoisResponse>(
				`${import.meta.env.VITE_BACKEND_URL}/api/auth/signin`,
				userData,
				{ withCredentials: true }
			);
			localStorage.setItem("user", JSON.stringify(res.data?.data));
			toast.success(res.data?.message);
			navigate("/");
		} catch (error: any) {
			toast.error(error.response?.data?.message);
		}
	};

	const handleGoogleLogin = () => {
		window.location.href = "http://localhost:8000/auth/google";
	};

	return (
		<div className="w-full bg-gray-950 h-screen flex justify-center items-center">
			<div className="w-[30%] h-[50%] border rounded-lg border-gray-800 p-8">
				<div className="p-4 text-center font-semibold my-2  bg-transparent w-full rounded-md text-white">
					Login
				</div>
				<input
					type="text"
					placeholder="Email"
					value={userData.email}
					onChange={(e) =>
						setUserData({ ...userData, email: e.target.value })
					}
					className="text-white p-4 border my-2 border-gray-600 bg-transparent w-full rounded-md"
				/>
				<input
					type="text"
					placeholder="Password"
					value={userData.password}
					onChange={(e) =>
						setUserData({ ...userData, password: e.target.value })
					}
					className="text-white p-4 border my-2 border-gray-600 bg-transparent w-full rounded-md"
				/>
				<button
					className="p-4 border my-2 border-gray-600 bg-transparent w-full rounded-md text-white"
					onClick={handleGoogleLogin}
				>
					Login With Google
				</button>

				<button
					onClick={() => {
						console.log("clicked");

						loginHandler();
					}}
					className="p-4 border my-2 border-gray-600 bg-transparent w-full rounded-md text-white"
				>
					Submit
				</button>
			</div>
		</div>
	);
};

export default Login;

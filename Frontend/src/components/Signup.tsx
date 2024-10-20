import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { IAxoisResponse } from "../types/generic";
import axios from "axios";

const Signup: React.FC = () => {
	const [signUpData, setSignUpData] = useState({
		email: "",
		password: "",
		name: "",
	});

	const navigate = useNavigate();

	const signUpHandler = async () => {
		try {
			const res = await axios.post<IAxoisResponse>(
				`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,
				signUpData,
			);
			toast.success(res.data?.message);
			navigate("/");
		} catch (error: any) {
			console.log(error);

			toast.error(error.response?.data?.message);
		}
	};

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
	};
	return (
		<div className="w-full bg-gray-950 h-screen flex justify-center items-center">
			<div className="w-[30%] h-[60%] border rounded-lg border-gray-800 p-8">
				<div className="p-4 text-center font-semibold my-2  bg-transparent w-full rounded-md text-white">
					Sign Up
				</div>
				<input
					type="text"
					name="name"
					placeholder="name"
					onChange={(e) => onChangeHandler(e)}
					className=" text-white p-4 border my-2 border-gray-600 bg-transparent w-full rounded-md"
				/>
				<input
					type="text"
					name="email"
					onChange={(e) => onChangeHandler(e)}
					placeholder="Email"
					className=" text-white p-4 border my-2 border-gray-600 bg-transparent w-full rounded-md"
				/>
				<input
					type="text"
					name="password"
					onChange={(e) => onChangeHandler(e)}
					placeholder="Password"
					className=" text-white p-4 border my-2 border-gray-600 bg-transparent w-full rounded-md"
				/>

				<button
					onClick={signUpHandler}
					className="p-4 border my-2 border-gray-600 bg-transparent w-full rounded-md text-white"
				>
					Submit
				</button>
			</div>
		</div>
	);
};

export default Signup;

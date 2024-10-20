import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IAxoisResponse } from "../types/generic";
import toast from "react-hot-toast";

const RedirectToHome = () => {
	const { accessToken } = useParams();
	console.log("parasm", accessToken);
	const navigate = useNavigate();
	useEffect(() => {
		axios
			.get<IAxoisResponse>(
				`${import.meta.env.VITE_BACKEND_URL}/api/auth/profile`,
				{
					withCredentials: true,
				}
			)
			.then((res) => {
				console.log("res", res);

				localStorage.setItem("user", JSON.stringify(res.data?.data));
				toast.success(res.data?.message);
				navigate("/");
			})
			.catch();
	}, []);

	return (
		<div className="w-full h-screen flex justify-center items-center">
			Loading....
		</div>
	);
};

export default RedirectToHome;

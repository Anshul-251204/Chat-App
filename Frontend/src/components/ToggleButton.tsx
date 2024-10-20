import { useState } from "react";
import { useAppDispatch } from "../redux/hook";
import { changeTheme } from "../redux/themeSlice";
import { MdDarkMode } from "react-icons/md";

const ToggleButton = () => {
	const [isToggled, setIsToggled] = useState(false);
	const dispatch = useAppDispatch();
	const handleToggle = () => {
		setIsToggled(!isToggled);
		dispatch(changeTheme());
	};

	return (
		<div className="flex gap-2  items-center">
			<span className="">{<MdDarkMode size={"2rem"} />}</span>
			<button
				onClick={handleToggle}
				className={`relative inline-flex items-center h-6 rounded-full w-12 transition-colors duration-200 ease-in-out ${
					isToggled ? "bg-blue-600" : "bg-gray-300"
				}`}
			>
				<span
					className={`absolute left-1 transition-transform duration-200 ease-in-out ${
						isToggled ? "transform translate-x-6" : ""
					}`}
				>
					<div className="bg-white w-5 h-5 rounded-full shadow-md"></div>
				</span>
			</button>
		</div>
	);
};

export default ToggleButton;

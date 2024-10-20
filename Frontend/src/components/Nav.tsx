import { useEffect, useRef, useState } from "react";
import ChangeTheme from "./ChangeTheme";
import ToggleButton from "./ToggleButton";
import { IoSettingsSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Nav = () => {
	const [isOpen, setIsOpen] = useState(false);

	const modalRef = useRef<any>();
	const navigate = useNavigate();

	useEffect(() => {
		const handleClickOutside = (e: any) => {
			if (modalRef.current && !modalRef.current.contains(e.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);
	return (
		<div className="w-full relative h-[10%] border-b border-accent bg-background text-foreground flex justify-between px-8 items-center">
			<h1 className="font-semibold text-2xl">Chat App</h1>
			<div className=" flex gap-4">
				<button onClick={() => setIsOpen(true)}>
					<IoSettingsSharp size={"2rem"} />
				</button>
			</div>
			{isOpen && (
				<div
					ref={modalRef}
					className="h-[100vh] border-accent top-0 w-[20%] bg-background text-foreground border-l absolute right-0 z-50  flex flex-col gap-8 pt-20"
				>
					<div className="w-full px-20 flex justify-end">
						<button
							onClick={() => setIsOpen(false)}
							className="font-semibold text-red-500"
						>
							Close X
						</button>
					</div>
					<div className="w-full pl-20 ">
						<ToggleButton />
					</div>
					<div className="w-full pl-20">
						<ChangeTheme />
					</div>
					<div className="w-full pl-20">
						<button
							onClick={() => {
								localStorage.clear();
								sessionStorage.clear();
								navigate("/login");
							}}
							className="border px-4 py-2 rounded-lg font-semibold "
						>
							Logout
						</button>
					</div>
					<div className="w-full pl-20">
						<button
							onClick={() => {
								navigate("/profile");
							}}
							className="border px-4 py-2 rounded-lg font-semibold "
						>
							Profile
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Nav;

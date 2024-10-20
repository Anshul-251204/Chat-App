import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { changeMessageTheme } from "../redux/themeSlice";

const ChangeTheme = () => {
	const themes = useAppSelector((state) => state.theme.themes);
	const dispatch = useAppDispatch();

	const modalRef = useRef<any>();

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

	const [isOpen, setIsOpen] = useState<boolean>(false);
	return (
		<div className=" relative">
			<button
				className="border px-4 py-2 rounded-lg font-semibold "
				onClick={() => setIsOpen(true)}
			>
				Theme
			</button>
			{isOpen && (
				<div
					ref={modalRef}
					className=" absolute right-10 mt-4 z-20 flex flex-wrap gap-3 p-4 rounded-lg w-[350px] h-[200px] bg-background text-foreground border border-accent "
				>
					{themes?.map((theme, idx) => (
						<div
							onClick={() =>
								dispatch(changeMessageTheme(theme.id))
							}
							className="text-foreground flex gap-2 to-v flex-col  font-semibold text-md  "
							key={idx}
						>
							<h1>{theme.id}</h1>
							<div
								className={`w-[40px] h-[40px] bg-gradient-to-tr ${theme.to} ${theme.from} ${theme.via}  rounded-full`}
							></div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default ChangeTheme;

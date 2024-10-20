import axios from "axios";
import React from "react";
import { IAxoisResponse } from "../types/generic";
import toast from "react-hot-toast";
import { useStore } from "../zustand/store";

const SearchUser: React.FC = () => {
	const [user, setUser] = React.useState("");
	const [users, setUsers] = React.useState([]);
	const [isopen, setIsOpen] = React.useState<boolean>(false);
	const modalRef = React.useRef<any>();
	const { setRefetchChats } = useStore();

	React.useEffect(() => {
		if (user) {
			axios
				.get<IAxoisResponse>(
					`${import.meta.env.VITE_BACKEND_URL}/api/auth?name=${user}`,
					{
						withCredentials: true,
					},
				)
				.then((res) => {
					setUsers(res.data?.data);
				});
		}
	}, [user]);

	React.useEffect(() => {
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

	const createChatHandler = async (id: string) => {
		try {
			const res = await axios.post<IAxoisResponse>(
				`${import.meta.env.VITE_BACKEND_URL}/api/chats/${id}`,
				{},
				{ withCredentials: true },
			);
			toast.success(res?.data?.message);
			setRefetchChats();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="w-full h-[50px] relative bg-background text-foreground ">
			<input
				value={user}
				onChange={(e) => {
					setIsOpen(true);
					setUser(e.target.value);
				}}
				type="text"
				placeholder="Search users...."
				className="w-full h-full  p-4 text-foreground bg-background border border-accent rounded-lg"
			/>
			{isopen && (
				<div
					ref={modalRef}
					className="w-full p-4 absolute border border-accent bg-background text-foreground mt-4 rounded-lg"
				>
					{users?.map((user: any, idx) => (
						<div
							onClick={() => {
								createChatHandler(user?._id);
								setIsOpen(false);
							}}
							key={idx}
							className="w-full p-4 border border-accent my-2 flex items-center bg-background text-foreground gap-4 rounded-md"
						>
							<div className="w-[40px] h-[40px] bg-foreground text-background rounded-full flex justify-center items-center font-semibold">
								{String(user?.name)
									.substring(0, 1)
									.toUpperCase()}
							</div>{" "}
							{user?.name}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default SearchUser;

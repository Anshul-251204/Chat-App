import React from "react";
import { IUser } from "../types/generic";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { setLastChats } from "../redux/chatSlice";

interface IChatProp {
	conversation: any;
}

const Chat: React.FC<IChatProp> = ({ conversation }) => {
	const user: IUser = JSON.parse(localStorage.getItem("user")!);
	const messageTheme = useAppSelector((state) => state.theme.theme);
	const dispatch = useAppDispatch();

	return (
		<div
			onClick={() => dispatch(setLastChats(conversation))}
			className="w-full h-[70px]  rounded-md bg-background text-foreground flex items-center gap-4 px-6"
		>
			<div
				className={`min-w-[50px] text-white bg-gradient-to-tr ${messageTheme.from} ${messageTheme.to} ${messageTheme.via} rounded-full flex justify-center items-center min-h-[50px]`}
			>
				<h1 className="text-2xl font-semibold">
					{(user?._id == conversation?.user1?._id
						? conversation?.user2?.name
						: conversation?.user1?.name
					)
						?.substring(0, 1)
						.toUpperCase()}
				</h1>
			</div>
			<div className="w-[70%]  h-[70px] flex items-center">
				<h1 className="text-lg text-foreground font-semibold">
					{user?._id == conversation?.user1?._id
						? conversation?.user2?.name
						: conversation?.user1?.name}
					...
				</h1>
			</div>
		</div>
	);
};

export default Chat;

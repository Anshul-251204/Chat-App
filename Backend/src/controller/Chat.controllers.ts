import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import Chat from "../models/chat.model";
import ApiResponse from "../utils/appResponse";

export const createChat = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { userId } = req.params;

		const existingChat = await Chat.findOne({
			user1: req?.user?._id,
			user2: userId,
		});

		console.log("existing -->", existingChat);

		if (existingChat) {
			return res
				.status(200)
				.json(
					new ApiResponse(
						existingChat,
						"chat is already created successfully...",
					),
				);
		}
		const chat = await Chat.create({
			user1: req.user?._id,
			user2: userId,
		});

		res.status(200).json(
			new ApiResponse(chat, "chat created successfully..."),
		);
	},
);

export const getChats = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const chats = await Chat.find({
			$or: [{ user1: req.user?._id }, { user2: req.user?._id }],
		}).populate("user1 user2", " name , email ");

		res.status(200).json(
			new ApiResponse(chats, "chat created successfully..."),
		);
	},
);

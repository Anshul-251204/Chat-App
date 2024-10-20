import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/appError";
import Message from "../models/message.model";
import ApiResponse from "../utils/appResponse";

export const sendMessage = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { content, chatId } = req.body;

		if (!content || !chatId) {
			return next(new ApiError(400, "Message or ChatId is required !"));
		}

		const message = await Message.create({
			content: content,
			sender: req.user?._id,
			chatId: chatId,
		});

		res.status(200).json(
			new ApiResponse(message, "message successfully sended !"),
		);
	},
);

export const getChatsMessages = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { chatId } = req.params;

		if (!chatId) {
			return next(new ApiError(400, "chatId is required !"));
		}

		const messages = await Message.find({ chatId })
		// .populate(
		// 	"sender",
		// 	" name  ",
		// );

		res.status(200).json(new ApiResponse(messages, "all Messages... "));
	},
);

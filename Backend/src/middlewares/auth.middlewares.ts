import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/appError";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
const auth = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { accessToken } = req.cookies;

		if (!accessToken) {
			return next(new ApiError(400, "accessToken not found !!!"));
		}

		const decodedToken: any = await jwt.verify(
			accessToken,
			process.env.JWT_SECRET!,
		);

		const user = await User.findById(decodedToken?._id);

		if (!user) {
			return next(new ApiError(400, "user not found !!!"));
		}

		req.user = user;
		next();
	},
);

export default auth;

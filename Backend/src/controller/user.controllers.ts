import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/appError";
import ApiResponse from "../utils/appResponse";
import jwt from "jsonwebtoken";
import axios from "axios";
import qs from "qs";

export const createUser = asyncHandler(
	async (
		req: Request<
			{},
			{},
			{ name: string; email: string; password: string },
			{}
		>,
		res: Response,
		next: NextFunction
	) => {
		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			return next(new ApiError(400, "Bad Request"));
		}

		const user = await User.create({ name, email, password });

		res.status(200).json({
			data: user,
			message: "user created successfully",
			success: true,
		});
	}
);

export const loginUser = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { email, password } = req.body;
		console.log("email", email);

		if (!email || !password) {
			return next(new ApiError(400, "Email and Password both required"));
		}

		const existingUser = await User.findOne({ email });

		const isMatch = await existingUser?.isPasswordMatch(password!);

		if (!isMatch) {
			return next(new ApiError(400, "Invalid cred...!"));
		}

		const accessToken = await jwt.sign(
			{
				_id: existingUser?._id,
				email: existingUser?.email,
			},
			process.env.JWT_SECRET!,
			{
				expiresIn: "10d",
			}
		);

		res.status(200)
			.cookie("accessToken", accessToken, {
				expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days expiration
				httpOnly: true, // Secure from XSS attacks
				sameSite: "none", // Required for cross-site cookies
				secure: true,
			})
			.json(new ApiResponse(existingUser, "User loged in successfully"));
	}
);

export const getAllUser = asyncHandler(
	async (
		req: Request<{}, {}, {}, { name: number }>,
		res: Response,
		next: NextFunction
	) => {
		const { name } = req.query;

		if (!name) {
			return next(new ApiError(400, "user name is not provide"));
		}
		const users = await User.find({
			name: { $regex: name, $options: "i" },
		});

		res.status(200).json(new ApiResponse(users, "all users"));
	}
);

export const googleLogin = asyncHandler(async (req: Request, res: Response) => {
	const code = req.query.code;

	try {
		const response = await axios.post(
			"https://oauth2.googleapis.com/token",
			qs.stringify({
				client_id: process.env.GOOGLE_CLIENT_ID,
				client_secret: process.env.GOOGLE_CLIENT_SECRET,
				redirect_uri: process.env.REDIRECT_URI,
				grant_type: "authorization_code",
				code: code,
			}),
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			}
		);

		const { access_token } = response.data;

		console.log("access", access_token);

		const userInfoResponse = await axios.get(
			`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`
		);

		const userInfo = userInfoResponse.data;

		console.log("userInfo", userInfo);

		let user;

		user = await User.findOne({ email: userInfo?.email });

		if (!user) {
			user = await User.create({
				email: userInfo?.email,
				name: userInfo?.name,
				avatar: userInfo?.picture,
			});
		}

		const accessToken = await jwt.sign(
			{
				_id: user?._id,
				email: user?.email,
			},
			process.env.JWT_SECRET!,
			{
				expiresIn: "10d",
			}
		);

		res.status(301)
			.cookie("accessToken", accessToken, {
				expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days expiration
				httpOnly: true, // Secure from XSS attacks
				sameSite: "none", // Required for cross-site cookies
				secure: true,
			})
			.redirect(`${process.env.FRONTEND_URI}/${accessToken}`);
	} catch (error) {
		console.error("Error in OAuth flow", error);
		res.status(500).send("Authentication failed");
	}
});

export const getProfile = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const users = await User.findById(req?.user?._id);

		res.status(200).json(new ApiResponse(users, "all users"));
	}
);

import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/appError";

const errorMiddleware = (
	err: ApiError,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	(err.statusCode = err.statusCode || 500),
		(err.message = err.message || "Something Went wrong");
	res.status(err.statusCode).json({
		data: null,
		success: false,
		message: err.message,
	});
};
export default errorMiddleware;

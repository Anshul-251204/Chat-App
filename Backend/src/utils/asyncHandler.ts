import { NextFunction, Request, Response } from "express";

const asyncHandler =
	(passedFunction: any) =>
	(req: Request, res: Response, next: NextFunction) => {
		Promise.resolve(passedFunction(req, res, next)).catch((err) =>
			next(err),
		);
	};

export default asyncHandler;

import { Request, Response, NextFunction } from "express";
import { z, ZodError, ZodType } from "zod";

export function validateBody(schema: ZodType) {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			req.body = schema.parse(req.body);
			next();
		} catch (error) {
			if (error instanceof ZodError) {
				return res.status(400).json({
					error: "Validation failed",
					details: error,
				});
			}
			next(error);
		}
	};
}

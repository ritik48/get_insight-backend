import { NextFunction, Request, Response } from "express";
import { ApiError } from "./ApiError";

const isAuthenticated = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authorization_header = req.headers["authorization"];
        if (!authorization_header) {
            throw new ApiError(401, "User not authenticated");
        }

        const token = authorization_header.split(" ")[1];

        if (!token) {
            throw new ApiError(401, "User not authenticated");
        }
        console.log("token = ", token);
        next();
    } catch (error) {
        next(error);
    }
};

export { isAuthenticated };

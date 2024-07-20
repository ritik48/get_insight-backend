import { NextFunction, Request, Response } from "express";
import { ApiError } from "./ApiError";
import { verifyJwt } from "./verifyJwt";

const isAuthenticated = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authorization_header = req.headers["authorization"];
        if (!authorization_header) {
            throw new ApiError(401, "You don't have the required access.");
        }

        const token = authorization_header.split(" ")[1];
        if (!token) {
            throw new ApiError(401, "You don't have the required access.");
        }

        try {
            await verifyJwt(token);
        } catch (error) {
            throw new ApiError(400, "You don't have the required access.");
        }

        next();
    } catch (error) {
        console.log("error = ", error);
        next(error);
    }
};

export { isAuthenticated };

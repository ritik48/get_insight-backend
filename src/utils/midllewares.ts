import { NextFunction, Request, Response } from "express";

const isAuthenticated = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authorization_header = req.headers["authorization"];
        if (!authorization_header) {
            throw new Error("User not authenticated");
        }

        const token = authorization_header.split(" ")[1];

        if (!token) {
            throw new Error("User not authenticated");
        }
        console.log("token = ", token);
        next();
    } catch (error) {
        next(error);
    }
};

export { isAuthenticated };

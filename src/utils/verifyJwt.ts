import jwt from "jsonwebtoken";

const EXPRESS_JWT_SECRET = process.env.EXPRESS_JWT_SECRET || "expresssecret";

export const verifyJwt = async (token: string) => {
    const verify = await jwt.verify(token, EXPRESS_JWT_SECRET);

    return verify;
};

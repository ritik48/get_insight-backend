"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const ApiError_1 = require("./ApiError");
const verifyJwt_1 = require("./verifyJwt");
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorization_header = req.headers["authorization"];
        if (!authorization_header) {
            throw new ApiError_1.ApiError(401, "You don't have the required access.");
        }
        const token = authorization_header.split(" ")[1];
        if (!token) {
            throw new ApiError_1.ApiError(401, "You don't have the required access.");
        }
        try {
            yield (0, verifyJwt_1.verifyJwt)(token);
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, "You don't have the required access.");
        }
        next();
    }
    catch (error) {
        console.log("error = ", error);
        next(error);
    }
});
exports.isAuthenticated = isAuthenticated;

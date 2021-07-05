"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Token_1 = __importDefault(require("../assets/Token"));
function authMiddleware(req, res, next) {
    var authorization = req.headers.authorization;
    var tokenHandler = new Token_1.default();
    if (!authorization) {
        return res.sendStatus(401);
    }
    try {
        tokenHandler.decrypt(authorization);
        return next();
    }
    catch (err) {
        return res.status(401).json({ message: err.message });
    }
}
exports.default = authMiddleware;

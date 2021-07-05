"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var TokenHandler = /** @class */ (function () {
    function TokenHandler() {
    }
    TokenHandler.prototype.encrypt = function (id, email) {
        return jsonwebtoken_1.default.sign({ id: id, email: email }, process.env.JWT_ENCRYPT, { expiresIn: '1d' });
    };
    TokenHandler.prototype.decrypt = function (authorization) {
        var token = authorization.replace('Bearer', '').trim();
        try {
            var data = jsonwebtoken_1.default.verify(token, process.env.JWT_ENCRYPT);
            var _a = data, id = _a.id, email = _a.email;
            return { id: id, email: email };
        }
        catch (_b) {
            throw new Error('Invalid Token!');
        }
    };
    return TokenHandler;
}());
exports.default = TokenHandler;

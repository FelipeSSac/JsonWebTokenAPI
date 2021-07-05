"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authMiddleware_1 = __importDefault(require("./app/middlewares/authMiddleware"));
var UserController_1 = __importDefault(require("./app/controllers/UserController"));
var MessageController_1 = __importDefault(require("./app/controllers/MessageController"));
var AuthController_1 = __importDefault(require("./app/controllers/AuthController"));
var router = express_1.Router();
//List all users
router.get('/users', authMiddleware_1.default, UserController_1.default.list);
//Register
router.post('/users', UserController_1.default.create);
//Update password
router.put('/users', authMiddleware_1.default, UserController_1.default.update);
//Delete user (soft delete)
router.delete('/users', authMiddleware_1.default, UserController_1.default.delete);
//Login authentication
router.post('/auth', AuthController_1.default.authenticate);
//List messages
router.get('/message', authMiddleware_1.default, MessageController_1.default.list);
//Post Message
router.post('/message', authMiddleware_1.default, MessageController_1.default.create);
//Edit Message
router.put('/message', authMiddleware_1.default, MessageController_1.default.update);
//Delete Message
router.delete('/message', authMiddleware_1.default, MessageController_1.default.delete);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("reflect-metadata");
var cors_1 = __importDefault(require("cors"));
require("./database/connect");
var routes_1 = __importDefault(require("./routes"));
var app = express_1.default();
var port = process.env.PORT || 3001;
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(routes_1.default);
app.listen(port, function () { return console.log("Server started at port " + port + "!"); });

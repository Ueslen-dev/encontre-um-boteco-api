"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PubController_1 = __importDefault(require("@controllers/PubController"));
const route = express_1.default.Router();
const Pub = new PubController_1.default();
route.get('/pub', Pub.index);
exports.default = route;

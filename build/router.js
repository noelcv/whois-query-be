"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_controller_1 = __importDefault(require("./controllers/index.controller"));
const router = (0, express_1.Router)();
router.get("/", index_controller_1.default.home.getHome);
router.get("/whois", index_controller_1.default.whois.lookUp);
router.post("/whois", index_controller_1.default.whois.addLog);
exports.default = router;

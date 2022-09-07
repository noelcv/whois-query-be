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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import mongoose from 'mongoose';
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const default_1 = __importDefault(require("../config/default"));
const MONGODB_URL = `${default_1.default.DB_URL}/${default_1.default.DB_NAME}`;
console.log(MONGODB_URL, 'db_url');
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('🚀 Connecting to database..., config.dbURI: ', MONGODB_URL);
        yield mongoose_1.default.connect(MONGODB_URL, {
            dbName: "whois",
            autoCreate: true,
        });
        console.log('Successful Mongoose Connection');
    }
    catch (err) {
        console.log(err);
    }
}))();
exports.default = mongoose_1.default;

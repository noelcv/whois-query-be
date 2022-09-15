"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./router"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const contentSecurityPolicy_1 = __importDefault(require("./config/contentSecurityPolicy"));
const PORT = process.env.PORT || 3001;
const allowedOrigins = [process.env.PRODUCTION_CLIENT_URL, process.env.DEV_CLIENT_URL];
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error('Request origin not allowed by CORS!'));
        }
    },
    methods: ['GET'],
}));
app.use((0, helmet_1.default)());
app.use((0, helmet_1.default)({ contentSecurityPolicy: contentSecurityPolicy_1.default }));
// app.use(csp(CONTENT_SECURITY_POLICY))
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(router_1.default);
app.listen(PORT, () => {
    try {
        console.log(`🚀 Server is running at http://localhost:${PORT}`);
    }
    catch (err) {
        console.error("❌ Error launching server: ", err);
    }
});

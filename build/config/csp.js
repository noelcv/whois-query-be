"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CONTENT_SECURITY_POLICY = {
    useDefaults: true,
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        connectSrc: ["'self'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        styleSrc: ["'self'"],
        fontSrc: ["'self'"],
        sandbox: ["allow-forms", "allow-scripts"],
        reportUri: "/report-violation",
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
    },
    reportOnly: true,
};
// default-src 'none'; 
exports.default = CONTENT_SECURITY_POLICY;

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
exports.addLog = exports.lookUp = void 0;
const net_1 = __importDefault(require("net"));
const validateSld_util_1 = require("./controller.utils/validateSld.util");
const validateTld_util_1 = require("./controller.utils/validateTld.util");
const query_model_1 = __importDefault(require("../models/query.model"));
function lookUp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sld = req.query.sld;
            const tld = req.query.tld;
            console.log('sld from Client: ', sld);
            console.log('tld from Client: ', tld);
            const isValidSld = (0, validateSld_util_1.validateSld)(sld);
            const isValidTld = (0, validateTld_util_1.validateTld)(tld);
            if (isValidSld && isValidTld) {
                const domain = `${sld}.${tld}`;
                const queryPacket = `${domain}\r\n`;
                const host = 'whois.verisign-grs.com';
                const client = new net_1.default.Socket();
                yield client.connect(43, host, () => {
                    client.write(queryPacket);
                });
                client.on('data', (data) => {
                    const result = data.toString();
                    console.log(result, 'result');
                    res.send(JSON.stringify(result));
                    const payload = {
                        domainName: domain,
                        logRecord: result,
                    };
                    addLog(payload);
                    res.status(200);
                    client.destroy();
                });
                client.on('error', (err) => {
                    console.log('❌ Error connecting to whois server: ', err);
                });
            }
            else if (!isValidSld && !isValidTld) {
                res.send(`❌ You are a troll! 🧌🧌🧌 "${sld}.${tld}" is not a valid input (and you probably know it...)`);
                res.status(400);
            }
            else if (!isValidSld) {
                res.send(`❌ Invalid SLD: ${sld}. Please, try again`);
                res.status(400);
            }
            else if (!isValidTld) {
                res.send(`❌ Invalid TLD: ${tld}. At the moment, only .COM and .NET domain names are supported`);
                res.status(400);
            }
            else {
                res.send('Domain not supported');
                res.status(400);
            }
        }
        catch (err) {
            console.log(' ❌ Error at lookup Controller: ', err);
            res.status(500);
        }
    });
}
exports.lookUp = lookUp;
function addLog(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield query_model_1.default.create(payload);
            if (data)
                console.log('✅ Log record added to DB');
        }
        catch (err) {
            console.log('Error storing the query log to database', err);
        }
    });
}
exports.addLog = addLog;

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
exports.lookUp = void 0;
const net_1 = __importDefault(require("net"));
function lookUp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sld = 'google';
            const tld = 'com';
            // const sld = req.body.sld;
            // const tld = req.body.tld;
            if (tld === 'com' || tld === 'net') {
                const domain = `${sld}.${tld}`;
                const queryPacket = `${domain}\r\n`;
                const host = 'whois.verisign-grs.com';
                const client = new net_1.default.Socket();
                client.connect(43, host, () => {
                    console.log('client connected to whois server: ', client);
                    client.write(queryPacket);
                });
                client.on('data', (data) => {
                    console.log('client received data: ', data.toString());
                    const result = data.toString();
                    console.log('🟢 Resolved Result: ', result);
                    res.send(result);
                    client.destroy();
                });
                client.on('error', (err) => {
                    console.log('❌ Error: ', err);
                });
            }
            else {
                res.send('TLD not supported');
            }
        }
        catch (err) {
            console.log(' ❌ Error at lookup Controller: ', err);
            res.status(500);
        }
    });
}
exports.lookUp = lookUp;

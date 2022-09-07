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
            const sld = 'careers..centralnicgroup';
            const tld = 'xyz';
            const isValidSld = validateSld(sld);
            const isValidTld = validateTld(tld);
            // const sld = req.body.sld;
            // const tld = req.body.tld;
            if (isValidSld && isValidTld) {
                const domain = `${sld}.${tld}`;
                const queryPacket = `${domain}\r\n`;
                const host = 'whois.verisign-grs.com';
                const client = new net_1.default.Socket();
                yield client.connect(43, host, () => {
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
                    console.log('❌ Error connecting to whois server: ', err);
                });
            }
            else if (!isValidSld && !isValidTld) {
                res.send(`❌ You are a troll and your inputs ${sld}.${tld} are totally invalid and you know it.`);
            }
            else if (!isValidSld) {
                res.send(`❌ Invalid SLD: ${sld}`);
            }
            else if (!isValidTld) {
                res.send(`❌ Invalid TLD: ${tld}`);
            }
            else {
                res.send('Domain not supported');
            }
        }
        catch (err) {
            console.log(' ❌ Error at lookup Controller: ', err);
            res.status(500);
        }
    });
}
exports.lookUp = lookUp;
/*
DNS names can contain only alphabetical characters (A-Z), numeric characters (0-9), the minus sign (-), and the period (.).
Period characters are allowed only when they are used to delimit the components of domain style name
*/
function validateSld(sld) {
    let regex = new RegExp(/^(?!\.)(?!.*\.$)(?!.*\.\.)[a-zA-Z0-9.]+$/);
    /**
     * ^(?!\.) -- negative look ahead to make sure the first character is not a period
     * (?!.*\.$) -- last character is not a period
     * (?!.*\.\.) -- make sure there are not two periods in a row
     * [a-zA-Z0-9-.]+$ -- only allow letters, numbers, periods, and hyphens
     */
    let isValidInput = regex.test(sld);
    let hasValidLength = sld.length > 0 && sld.length < 64;
    return isValidInput && hasValidLength ? true : false;
}
/*only allow for .com and .net*/
function validateTld(tld) {
    return tld === 'com' || tld === 'net' ? true : false;
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTld = void 0;
/*only allow for .com and .net*/
function validateTld(tld) {
    return tld === 'com' || tld === 'net' ? true : false;
}
exports.validateTld = validateTld;

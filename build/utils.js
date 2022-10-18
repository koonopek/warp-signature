"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeTxId = void 0;
const utils_1 = require("arweave/node/lib/utils");
const fromHexString = (hexString) => Uint8Array.from(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
const encodeTxId = async function (signature) {
    const hash = await crypto.subtle.digest('sha-256', fromHexString(signature));
    return (0, utils_1.bufferTob64Url)(new Uint8Array(hash));
};
exports.encodeTxId = encodeTxId;
//# sourceMappingURL=utils.js.map
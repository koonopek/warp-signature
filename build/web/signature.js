"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evmSignature = void 0;
const utils_1 = require("utils");
const evmSignature = async (tx) => {
    const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
    });
    console.log('Connected account: ' + accounts[0]);
    tx.owner = accounts[0];
    tx.addTag('Signature-type', 'EVM');
    tx.signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [accounts[0], JSON.stringify(tx)]
    });
    console.log('Signature: ' + tx.signature);
    tx.id = await (0, utils_1.encodeTxId)(tx.signature);
    console.log(tx);
    return tx;
};
exports.evmSignature = evmSignature;
//# sourceMappingURL=signature.js.map
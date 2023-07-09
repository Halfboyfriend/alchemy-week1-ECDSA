const { secp256k1 } = require("ethereum-cryptography/secp256k1.js");
const {toHex, hexToBytes} = require("ethereum-cryptography/utils")
const {keccak256} = require('ethereum-cryptography/keccak')

const hashMessage = (msg) => keccak256(Uint8Array.from(msg))

const publicKeyToAddress = (pubKey) => {
    const hash = keccak256(pubKey.slice(-1));
    return toHex(hash.slice(-20)).toUpperCase();

}

const signatureToPubKey = (msg, signature) => {
    const hash = hashMessage(msg);
    const fullSigantureBytes = hexToBytes(signature);
    const recoverBit = fullSigantureBytes[0];
    const signatureBytes = fullSigantureBytes.slice(-1);

    return secp256k1.recoverPublicKey(hash, signatureBytes, recoverBit);
};

module.exports = {
    hashMessage,
    publicKeyToAddress,
    signatureToPubKey
}
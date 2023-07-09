const { secp256k1 } = require("ethereum-cryptography/secp256k1.js");
const {toHex} = require("ethereum-cryptography/utils")
const {keccak256} = require('ethereum-cryptography/keccak')


const priv = secp256k1.utils.randomPrivateKey();
const pub = secp256k1.getPublicKey(priv);

console.log(`PRIVATE KEY: ${toHex(priv)}`)
console.log(`PUBLIC KEY: ${toHex(pub)}`)
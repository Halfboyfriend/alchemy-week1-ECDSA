import * as secp from "ethereum-cryptography/secp256k1.js";
import {keccak256} from "ethereum-cryptography/keccak.js";
import {hexToBytes, toHex} from "ethereum-cryptography/utils.js";

const userAccountKeys = new Map([
    [
        'sam', {
            private: "2f7b3ca4d833551fba8f736357fca523bba2910ed1ec3e5e23d410bb596f50fb",
            public: "0371f54add63835f811dbb156b5e798946797d03c8017b6dee62c8e9e5c8d15887"
        },
    ],
    [
        'jone', {
            private: '1cda46ee8957f94eab0235fba398913c39f566a9f9a578c8bc8681dc38a9c922',
            public: '03ce5b99fb6da5587f1c141a2fb161d312e4e6c502b44875166cf43412f2e590ea',

        },
    ],
    [
        'may', {
            private: '9d0d86447ec568a4160b931a11c5f0d11a8fb7b25ec7689f38e26fea0a60bb12',
            public: '03279a1291f516d9582752a19cb4458beaf579aeea209116d51a4f6b4f4750a909',
        }
    ]
]);

const USERS= Array.from(userAccountKeys.keys());

// console.log(USERS)

const hashMessage = (msg) => keccak256(Uint8Array.from(msg));

const getPrivateKey = (user) => {
    if (!user) return null;
    return hexToBytes(userAccountKeys.get(user).private);
}

const getPublicKey = (user) => {
    if (!user) return null;
    return hexToBytes(userAccountKeys.get(user).public);
}

const getAddress = (user) => {
    if (!user) return null;
    const pubKey = getPrivateKey(user);
    const hash = keccak256(pubKey.slice(-1))
    return toHex(hash.slice(-20)).toUpperCase();
}

const getHexPublic = (user) => {
    if (!user) return null;
    return toHex(getPublicKey(user)).toUpperCase();
}

const sign = async (userName, msg) => {
    const privateKey = getPrivateKey(userName);
    const hash = hashMessage(msg);

    const [signature, recoverBit] = await secp.sign(hash, privateKey, {
        recovered: true,
    });

    const fullSignature = new Uint8Array([recoverBit, ...signature]);
    return toHex(fullSignature);
}

const wallet = {
    USERS,
    sign,
    getAddress,
    getHexPublic
};



export default wallet;
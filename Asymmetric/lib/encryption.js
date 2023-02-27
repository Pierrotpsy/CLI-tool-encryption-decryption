const crypto = require("crypto")

function encrypt(data, publicKey) {

    const encryptedData = crypto.publicEncrypt(
        {
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        },
        Buffer.from(data)
    );
    return encryptedData.toString("base64");
}

module.exports = {encrypt};
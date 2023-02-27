const crypto = require("crypto")

function decrypt(data, privateKey) {
    const decryptedData = crypto.privateDecrypt(
        {
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        },
        Buffer.from(data, "base64")
    );
    return decryptedData.toString("utf-8");
}

module.exports = {decrypt};
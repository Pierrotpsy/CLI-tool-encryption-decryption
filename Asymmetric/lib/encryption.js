const crypto = require("crypto")

function encrypt(data, publicKey) {
    const encryptedData = crypto.publicEncrypt(
        {
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        },
        // We convert the data string to a buffer using `Buffer.from`
        Buffer.from(data)
    );
    return encryptedData.toString();
}

module.exports = {encrypt};
const crypto = require ("crypto");
const algorithm = "aes-256-cbc";

function encrypt(data, key, iv) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encryptedData = cipher.update(data, "utf-8", "hex");
    encryptedData += cipher.final("hex");

    return encryptedData;
}

module.exports = {encrypt};
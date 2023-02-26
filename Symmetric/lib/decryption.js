const crypto = require ("crypto");
const algorithm = "aes-256-cbc";

function decrypt(data, key, iv) {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decryptedData = decipher.update(data, "hex", "utf-8");
    decryptedData += decipher.final("utf8");

    return decryptedData;
}

module.exports = {decrypt};
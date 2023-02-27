const crypto = require ("crypto");
const fs = require("fs");
const { Command } = require('commander');
const enc = require("../lib/encryption");
const dec = require("../lib/decryption");

const program = new Command();


program
    .name('AES-256 encryption/decryption')
    .description('CLI to encrypt and decrypt some file using AES-256')
    .version('1.0.0');

program.command('encrypt')
    .description('Encrypt a file using AES-256, and optionally a key and initialization vector.')
    .option('-f, --file <string>', 'File to encrypt', '../data/data.txt')
    .option('--key <Buffer>', 'Use given key to encrypt', crypto.randomBytes(32))
    .option('--iv <Buffer>', 'Use given initialization vector to encrypt', crypto.randomBytes(16))
    .option('-o, --output <string>', 'File to store the encrypted data', "../data/encrypted_data.txt")
    .option('-ok, --outputKey <string>', 'File to store the encrypted data', "../data/encryption_key.txt")
    .option('-oiv, --outputIV <string>', 'File to store the encrypted data', "../data/encryption_iv.txt")
    .action((options) => {
        let key = Buffer.from(options.key, 'hex');
        if(key.length < 32) {
            key = Buffer.concat([key, crypto.randomBytes(32 - key.length)]);
        }

        const data = fs.readFileSync(options.file, {encoding: "utf-8",});
        const encryptedData = enc.encrypt(data, key, options.iv);
        fs.writeFileSync(options.output, encryptedData, {encoding: "utf-8",});
        fs.writeFileSync(options.outputKey, key.toString('hex'), {encoding: "utf-8",});
        fs.writeFileSync(options.outputIV, options.iv.toString('hex'), {encoding: "utf-8",});
        console.log("Encrypted string saved to file " + options.output);
        console.log("Encrypted key saved to file " + options.outputKey);
        console.log("Encrypted iv saved to file " + options.outputIV);
        console.log("Encryption successful");
    });

program.command('decrypt')
    .description('Decrypt a file using AES-256, a key, and an initialization vector.')
    .option('-f, --file <string>', 'File to decrypt', '../data/encrypted_data.txt')
    .option('--key <string>', 'Use key in file to decrypt', "../data/encryption_key.txt")
    .option('--iv <string>', 'Use initialization vector in file to decrypt', "../data/encryption_iv.txt")
    .option('-o, --output <string>', 'File to store the decrypted data', "../data/decrypted_data.txt")
    .action((options) => {

        const encryptedData = fs.readFileSync(options.file, {encoding: "utf-8",});
        const key = Buffer.from(fs.readFileSync(options.key, {encoding: "utf-8"}), 'hex');
        const iv = Buffer.from(fs.readFileSync(options.iv, {encoding: "utf-8"}), 'hex');
        const decryptedData = dec.decrypt(encryptedData, key, iv);
        fs.writeFileSync(options.output, decryptedData, {encoding: "utf-8"});
        console.log("Decrypted string saved to file " + options.output);
        console.log("Decryption successful");
    });

program.parse();
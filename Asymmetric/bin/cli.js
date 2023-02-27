const crypto = require ("crypto");
const fs = require("fs");
const { Command } = require('commander');
const enc = require("../lib/encryption");
const dec = require("../lib/decryption");

const program = new Command();


program
    .name('RSA encryption/decryption')
    .description('CLI to encrypt and decrypt some string using RSA')
    .version('0.8.0');

program.command('generate')
    .description('Generate a pair of RSA keys to use in encoding and decoding data.')
    .option('-l, --len <int>', 'Use given key length to generate RSA keys', '2048')
    .option('-opu --outputPublic <string>', 'File name to store the public key', '../data/public.pem')
    .option('-opr --outputPrivate <string>', 'File name to store the private key', '../data/private.pem')
    .action((options) => {
        const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
            // The standard secure default length for RSA keys is 2048 bits
            modulusLength: parseInt(options.len),
        })
        const publicK = publicKey.export({
            type: "pkcs1",
            format: "pem",
        });
        const privateK = privateKey.export({
            type: "pkcs1",
            format: "pem",
        });
        fs.writeFileSync(options.outputPublic, publicK, { encoding: "utf-8" });
        fs.writeFileSync(options.outputPrivate, privateK, { encoding: "utf-8"});

        console.log("Public key saved to file " + options.outputPublic);
        console.log("Private key saved to file " + options.outputPrivate);
    })

program.command('encrypt')
    .description('Encrypt a string using RSA and a public key.')
    .option('-f, --file <string>', 'File to encrypt', '../data/data.txt')
    .option('-k, --key <string>', 'Public key file', "../data/public.pem")
    .option('-o, --output <string>', 'File to store the encrypted data', "../data/encrypted_data.txt")
    .action((options) => {
        const data = fs.readFileSync(options.file, {encoding: "utf-8",});
        const key = Buffer.from(fs.readFileSync(options.key, { encoding: "utf-8" }));
        const encryptedData = enc.encrypt(data, key);
        fs.writeFileSync(options.output, encryptedData, {encoding: "utf-8",});
        console.log("Encrypted string saved to file " + options.output);
        console.log("Encryption successful");
    });

program.command('decrypt')
    .description('Decrypt a string using RSA and a private key.')
    .option('-f, --file <string>', 'File to decrypt', '../data/encrypted_data.txt')
    .option('-k, --key <string>', 'Private key file', '../data/private.pem')
    .option('-o, --output <string>', 'File to store the decrypted data', "../data/decrypted_data.txt")
    .action((options) => {
        const encryptedData = fs.readFileSync(options.file, {encoding: "utf-8",});
        const privateKey = fs.readFileSync(options.key, { encoding: "utf-8" });
        const decryptedData = dec.decrypt(encryptedData, privateKey);
        fs.writeFileSync(options.output, decryptedData, {encoding: "utf-8"});
        console.log("Decrypted string saved to file " + options.output)
        console.log("Decryption successful");
    });

program.parse();
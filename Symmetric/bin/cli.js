const crypto = require ("crypto");
const { Command } = require('commander');
const enc = require("../lib/encryption");
const dec = require("../lib/decryption");

const program = new Command();


program
    .name('AES-256 encryption/decryption')
    .description('CLI to encrypt and decrypt some string using AES-256')
    .version('0.8.0');

program.command('encrypt')
    .description('Encrypt a string using AES-256, and optionally a key and initialization vector.')
    .argument('<string>', 'string to encrypt')
    .option('--key <Buffer>', 'Use given key to encrypt', crypto.randomBytes(32))
    .option('--iv <Buffer>', 'Use given initialization vector to encrypt', crypto.randomBytes(16))
    .action((str, options) => {
        let key = Buffer.from(options.key, 'hex');
        if(key.length < 32) {
            key = Buffer.concat([key, crypto.randomBytes(32 - key.length)]);
        }

        const data = enc.encrypt(str, key, options.iv);
        console.log("Encrypted string : " + data);
        console.log("Encryption key : " + key.toString('hex'));
        console.log("Encryption IV : " + options.iv.toString('hex'))
    });

program.command('decrypt')
    .description('Decrypt a string using AES-256, a key, and an initialization vector.')
    .argument('<string>', 'string to decrypt')
    .option('--key <Buffer>', 'Use given key to decrypt')
    .option('--iv <Buffer>', 'Use given initialization vector to decrypt')
    .action((str, options) => {

        let key = Buffer.from(options.key, 'hex');
        let iv = Buffer.from(options.iv, 'hex');
        const data = dec.decrypt(str, key, iv);
        console.log("Decrypted string : " + data);
    });

program.parse();
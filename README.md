# CLI-tool-encryption-decryption
 
This project contains two CLI tools. One is used for symmetrical encryption and the other uses asymmetrical encryption.

## Symmetrical encryption

The symmetrical encryption uses AES-256 and a provided or random security key to encrypt and decrypt a file.

### Installing the dependencies
Go to the `Symmetric` directory and run this command to install the dependencies for the project:

```shell
npm install
```

### Running the CLI

Go to the `Symmetric/bin` directoryand run this command to see the functionalities of the CLI:
```shell
node cli.js help
```

You will see the different commands available.

For more information on a specific command, you can run:
```shell
node cli.js help <command>
```

The CLI uses default files found in `~/data`, but options can be used to modify this behavior.

## Asymmetrical encryption

The asymmetrical encryption uses an RSA key pair to encrypt and decrypt a file. The key pair can also be generated using this CLI.

### Installing the dependencies
Go to the `Asymmetric` directory and run this command to install the dependencies for the project:

```shell
npm install
```

### Running the CLI

Go to the `Asymmetric/bin` directoryand run this command to see the functionalities of the CLI:
```shell
node cli.js help
```

You will see the different commands available.

For more information on a specific command, you can run:
```shell
node cli.js help <command>
```

The CLI uses default files found in `~/data`, but options can be used to modify this behavior.

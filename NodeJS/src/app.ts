
import { AesDecrypt3 } from "./aes-decrypt-3";
import { DsbUtils } from "./utils";

console.log("Test Decryption Node program \n");

const  secretIdPermanceKey : string = '90733A75F19347118B3BE0030AB590A8';
const stringToDecrypt: string = 'LLYblEfzo/1yQNkqoDn5QQ==';
const softwareID: string = '36094666-7e37-4717-8ab0-0c3d3485f56e';
const stringToEncrypt = "koss.blake";

var encryptionKey = `${softwareID}${secretIdPermanceKey}`;


let aes3 = new AesDecrypt3();

console.log(`Encrypting: ${stringToEncrypt}`);
let encryptedBuffer  = aes3.encrypt(encryptionKey, stringToEncrypt);
console.log(`Expected result is (should be same as .NET): ${stringToDecrypt}`);
let actualEncrypyedString = DsbUtils.uint8ToBase64(encryptedBuffer);
console.log(`Actual result is:  ${actualEncrypyedString} \n`);

console.log(`Decrypting the NodeJS encrypted: ${actualEncrypyedString}`);
let decryptedActual = aes3.decrypt(encryptionKey, encryptedBuffer);
console.log(`Expected result is: ${stringToEncrypt}`);
console.log(`Actual result is:  ${decryptedActual} \n`);

console.log(`Decrypting the NET Core encrypted: ${stringToDecrypt}`);
let buffer = Buffer.from(stringToDecrypt, 'base64')
let decryptedString = aes3.decrypt(encryptionKey, buffer);
console.log(`Expected result is: ${stringToEncrypt}`);
console.log(`Actual result is:  ${decryptedString} \n`);





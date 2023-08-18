

import * as crypto from 'crypto'
import { createCipheriv } from 'crypto';
import { enc } from 'crypto-js';
import { TextEncoder } from 'util';
import { DsbUtils } from './utils';
import * as zlib from 'node:zlib'

export class AesDecrypt3  {

    algorithm = 'AES-192-CBC';
    IV : Buffer;

    constructor() { 
        this.IV = Buffer.alloc(16);
    }

    getEncrptionKey(encryptionKey: string): Buffer{
        const utf8EncodeText = new TextEncoder();
        let alg = crypto.createHash('sha512');
        alg.write(utf8EncodeText.encode(encryptionKey));
        let keyH = alg.digest().slice(0,24);
        return keyH;
    }

    decrypt(encryptionKey: string, bufferToDecrypt: Uint8Array) : string {
        // get the encryption key
        let key = this.getEncrptionKey(encryptionKey);
        var decipher : crypto.Decipher = crypto.createDecipheriv('aes-192-cbc', key, this.IV);
        
        // decrypt the buffer
        var decryptedBuffer = decipher.update(bufferToDecrypt);
        decryptedBuffer = Buffer.concat([decryptedBuffer, decipher.final()]);

        // decompress the buffer
        let decompressedBuffer = zlib.inflateRawSync(decryptedBuffer);
        let decryptedString = decompressedBuffer.toString('utf-8')
        return decryptedString;
    }

    encrypt(encryptionKey: string, stringToEncrypt: string) : Uint8Array {
        let buf = Buffer.from(stringToEncrypt, 'utf-8');
        // create the compressed buffer
        let compressedBuffer = zlib.deflateRawSync(buf);
        // get the encryption key
        let key = this.getEncrptionKey(encryptionKey);
        var cipher = createCipheriv('aes-192-cbc', key, this.IV);
        // now encrypt
        var encryptedBuffer = cipher.update(compressedBuffer);
        return Buffer.concat([encryptedBuffer, cipher.final()]);
    }

}
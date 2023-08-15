

import * as crypto from 'crypto'
import { createCipheriv } from 'crypto';
import { enc } from 'crypto-js';
import { TextEncoder } from 'util';
import { DsbUtils } from './utils';

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
        let key = this.getEncrptionKey(encryptionKey);
        var mykey = crypto.createDecipheriv('aes-192-cbc', key, this.IV);
        var buf = mykey.update(bufferToDecrypt);
        let st = buf.toString('utf-8') + mykey.final('utf-8');
        return st;
    }

    encrypt(encryptionKey: string, stringToEncrypt: string) : Uint8Array {
        let key = this.getEncrptionKey(encryptionKey);
        var mykey = createCipheriv('aes-192-cbc', key, this.IV);
        var mystr = mykey.update(stringToEncrypt.toString(), 'utf-8', 'base64')
        mystr += mykey.final('base64');
        return DsbUtils.base64ToUint8(mystr);
    }

}
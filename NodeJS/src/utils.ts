import { createHmac } from "crypto";
import { lib } from "crypto-js";

export class DsbUtils {

    // convert a byte array to a Crypyojs.lib.WordArray
    public static convertUint8ArrayToWordArray(u8Array: Uint8Array) : any {
        var words = [], i = 0, len = u8Array.length;
    
        while (i < len) {
            words.push(
                (u8Array[i++] << 24) |
                (u8Array[i++] << 16) |
                (u8Array[i++] << 8)  |
                (u8Array[i++])
            );
        }
    
        return {
            sigBytes: words.length * 4,
            words: words
        };
    }

    public static  convertWordArrayToUint8Array(wordArray: lib.WordArray): Uint8Array {
        var len = wordArray.words.length,
            u8_array = new Uint8Array(len << 2),
            offset = 0, word, i
        ;
        for (i=0; i<len; i++) {
            word = wordArray.words[i];
            u8_array[offset++] = word >> 24;
            u8_array[offset++] = (word >> 16) & 0xff;
            u8_array[offset++] = (word >> 8) & 0xff;
            u8_array[offset++] = word & 0xff;
        }
        return u8_array;
    }

    // conver a base64 styring to a byte array
    public static base64ToUint8(base64: string): Uint8Array {
        var binaryString = atob(base64);
        var bytes = new Uint8Array(binaryString.length);
        for (var i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes;
    }

    // convert a Byte array to a Base64 string
    public static uint8ToBase64(arr: Uint8Array): string {
        return btoa(
            Array(arr.length)
                .fill('')
                .map((_, i) => String.fromCharCode(arr[i]))
                .join('')
        );
    }

    public static jsonObjectToBase64(obj: any) {
        // converts the obj to a string
        const str = JSON.stringify(obj);
        // returns string converted to base64
        return Buffer.from(str).toString('base64');
    }

    public static replaceSpecialChars(b64string: string) {
        // create a regex to match any of the characters =,+ or / and replace them with their // substitutes
        let retVal = b64string.replace(/\//g, '_');
        retVal = retVal.replace(/=/g, '');
        retVal = retVal.replace(/\+/g, '-');
        return retVal;
    };

    public static createSha256Signature(jwtB64Header: string, jwtB64Payload: string, secret: string) {
        // create a HMAC(hash based message authentication code) using sha256 hashing alg
        let signature = createHmac('sha256', secret);

        // use the update method to hash a string formed from our jwtB64Header a period and 
        //jwtB64Payload 
        signature.update(jwtB64Header + '.' + jwtB64Payload);

        //signature needs to be converted to base64 to make it usable
        let retVal = signature.digest('base64');

        //of course we need to clean the base64 string of URL special characters
        retVal = this.replaceSpecialChars(retVal);
        return retVal;
    }

}

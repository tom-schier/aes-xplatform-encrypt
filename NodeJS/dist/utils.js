"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DsbUtils = void 0;
var crypto_1 = require("crypto");
var DsbUtils = /** @class */ (function () {
    function DsbUtils() {
    }
    // convert a byte array to a Crypyojs.lib.WordArray
    DsbUtils.convertUint8ArrayToWordArray = function (u8Array) {
        var words = [], i = 0, len = u8Array.length;
        while (i < len) {
            words.push((u8Array[i++] << 24) |
                (u8Array[i++] << 16) |
                (u8Array[i++] << 8) |
                (u8Array[i++]));
        }
        return {
            sigBytes: words.length * 4,
            words: words
        };
    };
    DsbUtils.convertWordArrayToUint8Array = function (wordArray) {
        var len = wordArray.words.length, u8_array = new Uint8Array(len << 2), offset = 0, word, i;
        for (i = 0; i < len; i++) {
            word = wordArray.words[i];
            u8_array[offset++] = word >> 24;
            u8_array[offset++] = (word >> 16) & 0xff;
            u8_array[offset++] = (word >> 8) & 0xff;
            u8_array[offset++] = word & 0xff;
        }
        return u8_array;
    };
    // conver a base64 styring to a byte array
    DsbUtils.base64ToUint8 = function (base64) {
        var binaryString = atob(base64);
        var bytes = new Uint8Array(binaryString.length);
        for (var i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes;
    };
    // convert a Byte array to a Base64 string
    DsbUtils.uint8ToBase64 = function (arr) {
        return btoa(Array(arr.length)
            .fill('')
            .map(function (_, i) { return String.fromCharCode(arr[i]); })
            .join(''));
    };
    DsbUtils.jsonObjectToBase64 = function (obj) {
        // converts the obj to a string
        var str = JSON.stringify(obj);
        // returns string converted to base64
        return Buffer.from(str).toString('base64');
    };
    DsbUtils.replaceSpecialChars = function (b64string) {
        // create a regex to match any of the characters =,+ or / and replace them with their // substitutes
        var retVal = b64string.replace(/\//g, '_');
        retVal = retVal.replace(/=/g, '');
        retVal = retVal.replace(/\+/g, '-');
        return retVal;
    };
    ;
    DsbUtils.createSha256Signature = function (jwtB64Header, jwtB64Payload, secret) {
        // create a HMAC(hash based message authentication code) using sha256 hashing alg
        var signature = (0, crypto_1.createHmac)('sha256', secret);
        // use the update method to hash a string formed from our jwtB64Header a period and 
        //jwtB64Payload 
        signature.update(jwtB64Header + '.' + jwtB64Payload);
        //signature needs to be converted to base64 to make it usable
        var retVal = signature.digest('base64');
        //of course we need to clean the base64 string of URL special characters
        retVal = this.replaceSpecialChars(retVal);
        return retVal;
    };
    return DsbUtils;
}());
exports.DsbUtils = DsbUtils;
//# sourceMappingURL=utils.js.map
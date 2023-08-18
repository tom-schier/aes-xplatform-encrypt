"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AesDecrypt3 = void 0;
var crypto = __importStar(require("crypto"));
var crypto_1 = require("crypto");
var util_1 = require("util");
var zlib = __importStar(require("node:zlib"));
var AesDecrypt3 = /** @class */ (function () {
    function AesDecrypt3() {
        this.algorithm = 'AES-192-CBC';
        this.IV = Buffer.alloc(16);
    }
    AesDecrypt3.prototype.getEncrptionKey = function (encryptionKey) {
        var utf8EncodeText = new util_1.TextEncoder();
        var alg = crypto.createHash('sha512');
        alg.write(utf8EncodeText.encode(encryptionKey));
        var keyH = alg.digest().slice(0, 24);
        return keyH;
    };
    AesDecrypt3.prototype.decrypt = function (encryptionKey, bufferToDecrypt) {
        // get the encryption key
        var key = this.getEncrptionKey(encryptionKey);
        var decipher = crypto.createDecipheriv('aes-192-cbc', key, this.IV);
        // decrypt the buffer
        var decryptedBuffer = decipher.update(bufferToDecrypt);
        decryptedBuffer = Buffer.concat([decryptedBuffer, decipher.final()]);
        // decompress the buffer
        var decompressedBuffer = zlib.inflateRawSync(decryptedBuffer);
        var decryptedString = decompressedBuffer.toString('utf-8');
        return decryptedString;
    };
    AesDecrypt3.prototype.encrypt = function (encryptionKey, stringToEncrypt) {
        var buf = Buffer.from(stringToEncrypt, 'utf-8');
        // create the compressed buffer
        var compressedBuffer = zlib.deflateRawSync(buf);
        // get the encryption key
        var key = this.getEncrptionKey(encryptionKey);
        var cipher = (0, crypto_1.createCipheriv)('aes-192-cbc', key, this.IV);
        // now encrypt
        var encryptedBuffer = cipher.update(compressedBuffer);
        return Buffer.concat([encryptedBuffer, cipher.final()]);
    };
    return AesDecrypt3;
}());
exports.AesDecrypt3 = AesDecrypt3;
//# sourceMappingURL=aes-decrypt-3.js.map
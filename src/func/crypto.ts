import * as CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_API_DATA_SECRET_KEY;
const getKeyBuffer = (_key: string) => {
    return SECRET_KEY;
    // return CryptoJS.SHA256(key);
};
export const decrypt = <T>(encrypted: string): T => {
    const parts = encrypted.split(':');
    const iv = CryptoJS.enc.Base64.parse(parts[0]);

    const encryptedData = parts[1];
    try {
        const decrypted = CryptoJS.AES.decrypt(encryptedData, getKeyBuffer(SECRET_KEY), { iv: iv });
        const data = decrypted.toString(CryptoJS.enc.Utf8);

        return JSON.parse(data) as T;
    } catch (error) {
        console.error('Decryption error:', error);
        throw new Error('Decryption failed: ' + error);
    }
}

export const encrypt = (data: any): string => {
    const jsonData = JSON.stringify(data);
    const iv = CryptoJS.lib.WordArray.random(16);
    const encrypted = CryptoJS.AES.encrypt(jsonData, getKeyBuffer(SECRET_KEY), { iv: iv });
    const ivBase64 = CryptoJS.enc.Base64.stringify(iv);
    const encryptedBase64 = encrypted.toString();
    return `${ivBase64}:${encryptedBase64}`;
};
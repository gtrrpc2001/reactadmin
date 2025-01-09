import * as CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_API_DATA_SECRET_KEY;
const getKeyBuffer = (_key: string) => {
    return SECRET_KEY;
};
export const decrypt = <T>(_encrypted: string): T => {
    const test = 't+egzd8/+R0fuFN8dm/BHw==:U2FsdGVkX18UYtGcDIG7jXWp5uaUsahAS6z6GRiuQ+cEZOMsO+VsD9esQ8dBNQVRrZQ5M7QV58837Dn0ZWaYybX7tvwnmjmclqoc5TjoIdnXWwbOGQFRlyZOk/pnZHPgzhmKAOGxeJs97QgV6syG/BsIiJWGuRQoftYJmpAxCUrur4RYUb/q8elvbZa/v39JZmYQY6lclcbJ2ljWkiP7oxoVnk4PS6ITIA91xpyOlxMGUO9PnLGYhXkflmb/6eHzEVcY50Cdf1wAXchy4uBVhh01i35jrhY1zPYmNvnhV6J2fnA5HILJM8p86pkwCbjiEPyC+9bLPLMRfMh4vUXanPcKNdu/cOizTZhMgoorHL5AG9C5KnXswwzJqqTZobbEZ5Zc5n5GYdH1CSNPtD3ImT05KXyzhltKXmqvAJA3vxWfqUjxzWleNojyjPonAgWcSmdSz9F/U/PSws2AWAAZu43OpmuEeRmsYGoqb8WUcazcN7R2RVsfrAb3jJISkKSRgEZsNOJO7OuTDCxQAoE2ZL7fog6Do4aNR271MCU+w1qG5D99GpQ2dtdTq5pPlVC5T49DCY72OsIzgla8OhR/n3PeVHX+Lmbt1VkfzTb0PzxMbytZKcWom/UJmXPktelaQ2enopeOburVuFnvFna/FNWTGJGOq/BMf34cGo8OVSk/iuxS49+YZst6zvYPhovdHpUVZmxLOG/6IpkE6xwNFbjTLaRv45Otqj8SKwsnOQLr5BYgAJqSZjEBk4zAZi3R1CMaMsx64lAUyhLKnmwLLmorRdySQCUmTUe/FyOHObRXdvGyPLkVZhGqGBNiQT38i/LFDC8IEEaAWJ2ag7NAlTjJxbZIksfV8cmfyPMBUuyFTBQ1OlycqpGaRz5F4Rut8BzkmNKugVYzftSz/RVQzNQk3RQITAy5pVUgIGCTN75vO+9q2IXvflnaIVwtEhvZPsV6bJXGDXnJl2f0paxku0peHLIH0/dZDo+Um5G2oSBF/9OBm+Qsi1t6wXElQX8NTW5dg0EsWT1m6YYz5TtZ4PC1Lmp1YwsuutNVxsiAf4l2NyMxpjYlLgO3rzzbDDXmMjdiA83C0/BnOulckiAKOg=='
    const parts = test.split(':');
    console.log('parts: ', parts.length)
    const iv = CryptoJS.enc.Base64.parse(parts[0]);
    console.log(parts.length)
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


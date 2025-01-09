declare module 'sjcl' {
    export interface Sjcl {
        encrypt(password: string, data: string): string;
        decrypt(password: string, data: string): string;
    }

    const sjcl: Sjcl;
    export default sjcl;
}
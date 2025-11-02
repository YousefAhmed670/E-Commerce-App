import * as CryptoJS from 'crypto-js';

const secretKey = CryptoJS.enc.Utf8.parse(process.env.SECRET_KEY as string);
const iv = CryptoJS.enc.Utf8.parse(process.env.IV as string);

export const cryptPhone = (phoneNumber: string) => {
  const encrypted = CryptoJS.AES.encrypt(phoneNumber, secretKey, { iv });
  return encrypted.toString();
};

export const decryptPhone = (cryptPhoneNumber: string) => {
  const decrypted = CryptoJS.AES.decrypt(cryptPhoneNumber, secretKey, { iv });
  return decrypted.toString(CryptoJS.enc.Utf8);
};

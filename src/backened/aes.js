var CryptoJS = require("crypto-js");
var key = "secretkey";
const Encrypt = (word) => {
  return CryptoJS.AES.encrypt(word, key).toString();
};
const Decrypt = (word) => {
  return CryptoJS.AES.decrypt(word, key).toString(CryptoJS.enc.Utf8);
};
module.exports = { Encrypt, Decrypt };

const crypto = require('crypto');

const ALGORITHM = 'aes-256-cbc';
const KEY = crypto.randomBytes(32); // Replace with your secure key management
const IV = crypto.randomBytes(16);

function encrypt(text) {
    const cipher = crypto.createCipheriv(ALGORITHM, KEY, IV);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return {
        iv: IV.toString('hex'),
        content: encrypted
    };
}

function decrypt(encrypted) {
    const decipher = crypto.createDecipheriv(
        ALGORITHM,
        KEY,
        Buffer.from(encrypted.iv, 'hex')
    );
    let decrypted = decipher.update(encrypted.content, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

module.exports = {
    encrypt,
    decrypt
};
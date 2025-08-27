const crypto = require('crypto');

// Generate a random 6-digit code
function generateTwoFactorCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Generate a secret for TOTP (Time-based One-Time Password)
function generateSecret(length = 32) {
    return crypto.randomBytes(length).toString('hex');
}

// Verify a code (for demo purposes, just compares strings)
function verifyTwoFactorCode(inputCode, actualCode) {
    return inputCode === actualCode;
}

module.exports = {
    generateTwoFactorCode,
    generateSecret,
    verifyTwoFactorCode,
};
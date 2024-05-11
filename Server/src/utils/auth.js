const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const secretKey = process.env.JWT_ACCESS_SECRET || 'secretKey';

function generateToken(user) {
    return jwt.sign(user, secretKey, { expiresIn: '1h' });
}

function verifyToken(token) {
    return jwt.verify(token, secretKey);
}

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

async function comparePasswords(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = { generateToken, verifyToken, hashPassword, comparePasswords };
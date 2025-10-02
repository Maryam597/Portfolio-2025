const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function generateAuthToken(adminId, expiresIn = '1h') {
    return jwt.sign({ adminId }, process.env.JWT_SECRET, { expiresIn });
}


const signIn = async (admin, password) => {
    console.log('Logging in admin...');

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
        throw new Error('Invalid email or password');
    }

    // Calculate session expiration time (e.g., 30 minutes)
    const sessionDuration = 30 * 60; // 30 minutes in seconds
    const expirationTime = Math.floor(Date.now() / 1000) + sessionDuration;

    const token = generateAuthToken(admin.ID, `${sessionDuration}s`);
    console.log('Generated token:', token);

    return { adminId: admin.ID, token, expiresIn: expirationTime };
};

module.exports = {
    generateAuthToken,
    signIn,
};

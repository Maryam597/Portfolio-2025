const JWT = require('jsonwebtoken');

// This function extracts the bearer token from the Authorization header
const extractBearer = authorization => {
    if (typeof authorization !== 'string') {
        return false;
    }

    // On isole le token
    const matches = authorization.match(/(bearer)\s+(\S+)/i); // extract the Bearer token using

    return matches && matches[2];
};

// This function checks if the token is present and valid
const checkTokenMiddleware = (req, res, next) => {
    // Extract Bearer token from Authorization header
    const token = req.headers.authorization && extractBearer(req.headers.authorization);

    console.log(' ### HEADERS:', req.headers);
    console.log(' ### TOKEN:', token);

    // Check if the token is missing or invalid
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - Missing or invalid token' });
    }

    // Verify the validity of the token using the jwt library
    JWT.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        console.log(' ### ERR TOKEN', err);
        console.log(' ### DECODED TOKEN', decodedToken);

        if (err) {
            return res.status(401).json({ message: 'Unauthorized - Invalid token' });
        }

        // Attach decoded token to the request for further use if needed
        req.decodedToken = decodedToken;

        // Continue to the next middleware in the chain
        next();
    });
};

module.exports = checkTokenMiddleware;

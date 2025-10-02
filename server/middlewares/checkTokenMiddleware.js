const jwt = require('jsonwebtoken');

const checkTokenMiddleware = (req, res, next) => {
    console.log('### TOKEN HEADER', req.headers.authorization);

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized - Missing token' });
  }

  const token = authHeader.replace('Bearer ', '');
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }

    req.decodedToken = decoded; // contient { adminId }
    next();
  });
};

module.exports = checkTokenMiddleware;

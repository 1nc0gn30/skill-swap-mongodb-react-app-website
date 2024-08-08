const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: "No authorization header provided" });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            // Log the error for monitoring purposes
            console.error('Token verification error:', err);

            const status = err.name === 'TokenExpiredError' ? 401 : 403;
            const message = err.name === 'TokenExpiredError' ? 'Token expired' : 'Token is invalid';
            return res.status(status).json({ message });
        }
        
        req.user = decoded; // This will include userId and username
        next();
    });
};

module.exports = authenticateToken;

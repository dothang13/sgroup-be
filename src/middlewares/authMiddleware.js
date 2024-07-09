const jwt = require("jsonwebtoken");

const secretKey = "your_secret_key";

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
        req.userId = decoded.id;
        next();
    });
};

module.exports = {
    verifyToken,
};

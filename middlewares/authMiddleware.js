const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["authorization"];
    if (!token){
        return res.status(403).json({
        message: "Token required"
    })
    } 
    try {
        const bearer = token.split(' ')[1];
        const decoded = jwt.verify(bearer, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token",
            error: error.message
        })
    }
}


module.exports = verifyToken
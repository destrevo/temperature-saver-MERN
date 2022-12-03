const jwt = require("jsonwebtoken")

module.exports = async (req, res, next) => {
    try {
        let token = req.header("authorization")
        if (!token) res.status(403).json("You are not authenticated")
        token = token.split(" ")[1]
        const decodedToken = jwt.verify(token, process.env.PRIVATE_KEY)    
        req.auth = decodedToken
        next();
    } catch (err) {
        res.status(401).json({ message: err.message })
        console.log(err)
        return next(err)
    }
}

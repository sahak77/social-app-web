const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>{
    const token = req.header("auth-token")
    if (!token) {
        res.status(400).send({error: "Access denied"})
        return
    }
    try {
        const verifyToken = jwt.verify(token, 'tumo_students')
        console.log(verifyToken);
        req.user = verifyToken.id
        next()
    } catch (error) {
        console.log(error);
        res.status(400).send({error: "invalid token"})
    }
}
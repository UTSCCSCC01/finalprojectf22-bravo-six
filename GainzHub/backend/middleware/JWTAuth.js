const jwt = require('jsonwebtoken');

const JWTAuth = (req, res, next) =>{
    const token = req.header('x-auth-token');

    if(!token){
        return res.status(401).json({error: "No token, authorization denied"});
    }

    //Verify the token
    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode.id;
        next();
    }
    catch(err){
        res.status(401).json({error: "Token is not valid"});
    }
}

module.exports = {JWTAuth}
//This file contains auth middleware for development endpoints (not to be used during production or within the app)

const verifyPassword = (req, res, next) => {
    const password = req.header('password');

    if(password == process.env.DEV_PASSWORD){
        next();
    }
    else{
        return res.status(400).json({error: "Not Authorized"});
    }
}

module.exports = {verifyPassword};
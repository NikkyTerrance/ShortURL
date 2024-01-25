const jwt = require("jsonwebtoken");




async function auth(req, res, next){
    try{
        const token = req.cookies.token;

        if(!token) {

            console.log("no token")
        }
        
        else {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.userid = verified.user;
        console.log(verified.user)
        }
        

        next();
    }
    catch(err){
        console.error(err);
        res.status(401).json({errorMessage: "unauthorised"})
    }
}

module.exports = auth;
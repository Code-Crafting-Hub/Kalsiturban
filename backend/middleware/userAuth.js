const jwt = require('jsonwebtoken');
require('dotenv').config();

const userAuth = async (req, res, next) =>{
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message: "Unauthorized"});
        }
        const decoded = await jwt.verify(token, process.env.JWT_U_SECRET);
        req.user = decoded;
        next();

    }catch(err){
        console.log("Error in user authorization");
    }
}

module.exports = userAuth;
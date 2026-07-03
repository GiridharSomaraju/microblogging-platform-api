const jwt = require("jsonwebtoken")

const middlewareFunction = async(req,res,next) => {
    const authHeader = req.headers["authorization"]
    if(authHeader === undefined){
        res.status(401).send("Invalid Token")
    }else{
        const jwtToken = authHeader.split(" ")[1]
        jwt.verify(jwtToken,process.env.JWT_SECRET_KEY,async(err,payload)=>{
            if(err){
                res.status(401).send("Invalid JWT token")
            }else{
                req.user_id = payload.user_id
                next();
            }
        })
    }
}

module.exports = middlewareFunction;
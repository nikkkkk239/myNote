const jwt = require("jsonwebtoken")
const config = require("../config.json")
function checkAuth(req,res,next){
    const token = req.headers['authorization']?.split(" ")[1];
    if(!token){
        return res.status(403).json({err:true,json:{message:"Unauthorized"}})
    }
    jwt.verify(token, process.env.privateKey, (err, userId) => {
        if (err) {
            return res.status(403).json({err:true,json:{message:"Unauthorized"}});
        }
        req.userId = userId;
        next();
    });
    
}
module.exports = checkAuth
const jwt = require('jsonwebtoken')
const userModel = require('../model/userModel')
const secretKey = 'process.env.SECRET_KEY';

const jwtConfig = {
    sign(payload){
        const token =jwt.sign(payload,secretKey)
    return token
},
  verifyToken(req,res,next){
    const token = req.headers.authorization?.split(' ')[1]
    console.log('token:',token)
    if(!token){
        return res.status(401).send({
            success:false,
            message:'no token provided'
        })
    }else{
        try {
            const decoded = jwt.verify(token,secretKey)
            console.log(decoded)
            console.log('agya', decoded.userId)
            // Add the decoded payload to the request object
            req.userId = decoded.userId;
            next();
        } catch (error) {
            console.log(error)
            return res.status(401).send({
                success:false,
                message:"invalid token"
            })
        }
    }
  },

  async IsAdmin(req,res,next){
    try {
        const user = await userModel.findById(req.userId)
        // const user = await userModel.findOne({_id:userId})
        console.log('user:',user)
        if(!user){
            return res.status(400).send({
                success:false,
                message:"no user found"
            })
        }
        if(user.role !== 1){
            return res.status(401).send({
                success: false,
                message: "Unauthorized user access"
            });
        }else{
        next();
        }
    } catch (error) {
        console.log(error)
        res.status(401).send({
            success: false,
                error: error.message,
                message: "Error in admin middleware",
        })
    }
  }
}

module.exports=jwtConfig;
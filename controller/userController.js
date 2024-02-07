const User = require('../model/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('../midllware/jwt')
const jsonwebtoken= require('jsonwebtoken')


const userController = {
    async register(req,res){
        const {name,email,phone,password} = req.body;
        try {
            if(!name || !email || !phone || !password){
                return res.status(400).send({
                    success:false,
                    message:"all feilds are required"
                })
            }
            const existingUser = await User.find({email})
            console.log("existingUser",existingUser);
            if(existingUser.length>1){             
                return res.status(401).send({
                    success:false,
                    message:"this email alraedy exist"
                })
            }
            // hash password 

            const salt = await bcrypt.genSalt(10)
            const hashPasswd = await bcrypt.hash(password,salt)

            const newUser =new User({
                name,
                email,phone,
                password:hashPasswd,
                
            })
            await newUser.save()
            return res.status(201).send({
                success:true,
                message:"user registered succesfully "
            })
        } catch (error) {
            console.log(error)
            res.status(401).send({
                success:false,
                message:"something went wrong",
                error:error.message
            })
        }
    },
    async login(req,res){
        try {
            const {email,password} = req.body;
            const user = await User.findOne({email})

            if(!user){
                return res.status(400).send({
                    success:false,
                    message: "email does not exist",
                })

            }
            const isPassword = await bcrypt.compare(password, user.password);
        if(!isPassword){
            return res.status(400).send({
                success:false,
                message:"wrong password"
            })
        }
        const token = jwt.sign({ userId: user._id, email: user.email })

        res.status(200).send({
            success:true,
            message:"user loggedin succesfully",
            user,
            token
        })
        } catch (error) {
            console.log(error)
            res.status(401).send({
                success:false,
                message:"something went wrong",
                error:error.message
            })
        }

    },
    async forgetPassword(req,res){
            const {email} = req.body;
        try {
            const user = await User.findOne({email})
            if(user){

                const Otp =  Math.floor(1000 + Math.random() * 9000);
                user.Otp = Otp
                console.log(Otp)

                const token = jwt.sign({Otp:user.Otp},{expiresIn:'1m'})
                console.log('token:',token)
                await user.save();
                res.status(200).send({
                    success:true,
                    message:"otp sent uccesfully",
                    token
                   })

            }
            else{
               return res.status(400).send({
                success:false,
                message:"user not found"
               })
            }

            
        } catch (error) {
            console.log(error)
            res.status(401).send({
                success:false,
                message:"something went wrong",
                error:error.message
            })
        }
    },
    async resetPassword(req,res){
        const {email,Otp,newPassword}=req.body;
        try {
            const user = await User.findOne({email})

            if(!user){
                return res.status(400).send({
                    success:false,
                    message:"no user found"
                })
                
            }
            
                if (Otp !== user.Otp) {
                return res.status(400).send({
                    success: false,
                    message: "Invalid OTP",
                });
                }
            user.password = newPassword;
            await user.save();
            res.status(200).send({
                success: true,
                message: " sucesfully updated",
            });
            
        } catch (error) {
            console.log(error)
            res.status(401).send({
                success:false,
                message:"something went wrong",
                error:error.message
            })
        }
    }
}

module.exports = userController;
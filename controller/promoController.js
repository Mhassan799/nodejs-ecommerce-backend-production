const promoModel = require('../model/promoModel')
const userModel = require('../model/userModel')
const promoController = {
    async promoCode(req,res){
        try {
            const user = req.userId
            const { promoCode,startDate,endDate,percentageDiscount, maxDiscountAmount,users } = req.body;
            console.log(req.body)
            console.log("users:",users)
               if(!promoCode || !startDate || !endDate || !percentageDiscount || !maxDiscountAmount){
                return res.status(400).send({
                    success:false,
                    message:"all feilds are requred",
                })
               }
              const promoCodeData = new promoModel({
                promoCode,
                startDate,
                endDate,
                percentageDiscount,
                maxDiscountAmount,
                users,
              });
              await promoCodeData.save();
              res.status(200).send({
                success:true,
                message:"promo created succesfully",
                promoCodeData
              })
          
        } catch (error) {
            console.log(error)
            res.status(400).send({
                success:false,
                message:"erro in promo code ",
                error:error.message
            })
        }
    },

    async addUsers(req,res){
        try {
            const promoCode = req.params.promoCode;
            const userId = req.body.userId;
            const user = await userModel.findOne({_id:userId})
            if(!user){
                return res.status(400).send({
                    success:false,
                    message:"userId not found"
                })
            }
            const promo = await promoModel.findOne({promoCode})

            if (!promo) {
                return res.status(404).send({
                    success: false,
                    message: "Promo code not found",
                });
            }else{
                promo.users.push(userId);
                await promo.save();

                res.status(200).send({
                    success: true,
                    message: "User added to the promo code successfully",
                    promo,
                });
            }
        } catch (error) {
            console.log(error)
            res.status(400).send({
                success:false,
                message:"erro in adding into promo ",
                error:error.message
            })
        }
    },

    async promoUpdate(req,res){
        try {
            const promoId = req.params.promoId;
            console.log("promoId:",promoId)
            const { promoCode,startDate,endDate,percentageDiscount, maxDiscountAmount } = req.body;
            const promo = await promoModel.findByIdAndUpdate(promoId,{ promoCode,startDate,endDate,percentageDiscount, maxDiscountAmount });
                console.log('promo:',promo)
            res.status(200).send({
                success:true,
                message:"promo updated succesfully",
                promo
            })
        } catch (error) {
            console.log(error)
            res.status(400).send({
                success:false,
                message:"erro in updating promo ",
                error:error.message
            })
        }
    },
    async promoDelete(req,res){
        try {
            const promoId = req.params.promoId;
            console.log("promoId:",promoId)
          
            const promo = await promoModel.findByIdAndDelete(promoId);
                console.log('promo:',promo)
            res.status(200).send({
                success:true,
                message:"promo deleted succesfully",
                promo
            })
        } catch (error) {
            console.log(error)
            res.status(400).send({
                success:false,
                message:"erro in deleeting promo ",
                error:error.message
            })
        }
    }
}
module.exports=promoController;
const orderModel = require('../model/orderModel')
const cartModel = require('../model/cartModel')
const promoModel = require('../model/promoModel')

const orderController = {
    async placeOrder(req, res) {
        // const user = req.userId;
        const { contact, address, paymentMethod, promoCode } = req.body;
        const username = req.userId;
        console.log(contact, address, paymentMethod, username)
        try {
            if (!contact || !address || !paymentMethod) {
                return res.status(400).send({
                    success: false,
                    message: "all feilds are required"
                })
            }

            /// check user if avaialbe r not
            const cart = await cartModel.find({ username: username })
            .populate({
                path: 'productId',
                select: ['price', 'quantity'],
            })
            console.log('cart:', cart)
            if (cart.length == 0) {
                console.log('cart ni h')
                return res.status(400).send({
                    success: false,
                    message: "not any user and cart found"
                })
            }
            if (cart) {
                console.log('cart mojjood h')
                // const products = await cartModel.find({})
                const name = cart[0].username;
                console.log('name:', name)
                const productIds = cart.map(item => item.productId._id);
                console.log('productIds:', productIds)

                const totalPriceOfEach = cart.map(item => {
                    const price = item.productId.price;
                    const quantityProduts = item.productId.quantity;
                    console.log('quantityProduts:', quantityProduts)
                    const quantityOrder = item.quantity;
                    console.log('quantityOrder:', quantityOrder)
                    if (quantityProduts < quantityOrder) {

                        return res.status(400).send({
                            success: false,
                            message: "out of stock"
                        })
                    }
                    else {

                        return price * quantityOrder;
                    }
                })
                console.log('totalPriceOfEach:', totalPriceOfEach)
                let totalPriceOfCart = totalPriceOfEach.reduce((acc, current) => acc + current, 0)
                
                let promoCodeDiscount = 0
                let totalAfterDiscount = 0
                
                    const promoCodeData = await promoModel.findOne({ promoCode })
                    console.log("promoCodeData:",promoCodeData)

                    const specialUsers = promoCodeData.users.every((id)=>id ===username);
                    console.log('specialUsers:',specialUsers)

                    if (promoCodeData && specialUsers===true) {


                       let promoCodeDiscount = (promoCodeData.percentageDiscount / 100) * totalPriceOfCart;
                       let  fixedAmountDiscount = promoCodeData.maxDiscountAmount;

                       if (fixedAmountDiscount >= promoCodeDiscount) {


                        let totalAfterDiscount = totalPriceOfCart - promoCodeDiscount;

                    console.log('totalAfterDiscount:', totalAfterDiscount)
                    
                    const newOrder = new orderModel({
                        username:name,
                        contact,
                        paymentMethod,
                        products: productIds,
                        total: totalPriceOfCart,
                        totalAfterDiscount,
    
                    })
    
    
    
                    await newOrder.save();

                        return res.status(200).send({
                            success: true,
                            message: `congrates you got discount of amount ${promoCodeDiscount}`,
                            newOrder
                        })
                    }

                    else if (fixedAmountDiscount < promoCodeDiscount) {

                        let totalAfterDiscount = totalPriceOfCart - promoCodeData.maxDiscountAmount;
                    console.log('totalAfterDiscount:', totalAfterDiscount)

                    const newOrder = new orderModel({
                        username: name,
                        contact,
                        paymentMethod,
                        products: productIds,
                        total: totalPriceOfCart,
                        totalAfterDiscount,
    
                    })
    
    
    
                    await newOrder.save();

                        return res.status(200).send({
                            message: `congrats you got discount of ${fixedAmountDiscount}`,
                            newOrder
                        })
                    }

                    


                    }else {
                        return res.status(400).send({
                            success: false,
                            message: "this promo code is not valid for you"
                        })
                    }
                            
                   
                
                console.log('totalPriceOfCart:', totalPriceOfCart)
                
                // res.status(200).send({
                //     success: true,
                //     message: "order pplaced succesfully",
                //     newOrder
                // })
            }
        } catch (error) {
            console.log(error)
            res.status(400).send({
                success: false,
                message: "error in placing order",
                error: error.message
            })
        }
    },
    async getAllOrders(req, res) {
        try {
            const orders = await orderModel.find()
            if (!orders) {
                return res.status(400).send({
                    success: false,
                    message: "noo order found",

                })
            }
            else {
                res.status(200).send({
                    success: true,
                    message: 'fetched orders succesfuly',
                    orders
                })
            }
        } catch (error) {
            conosle.log(error)
            res.status(400).send({
                success: false,
                message: "something went wrong while getting order",
                error: error.message
            })
        }
    }
}

module.exports = orderController;
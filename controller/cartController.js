const cartModel = require('../model/cartModel');
// const { findByIdAndDelete } = require('../model/categoryModel');
const ProductModel = require('../model/productModel')

const cartController = {
    async addToCart(req, res) {
        try {
            const productId = req.params.productId;
            const qty = req.body.qty;
            const username = req.userId;
            console.log('username:', username);
            console.log("productId:", productId);


            // check product already exist in cart of this user
            const cartProduct = await cartModel.findOne({ username, productId });
            console.log('cartProduct:', cartProduct);


            // Get product from db
            const thisProduct = await ProductModel.findOne({_id: productId});
        console.log('thisProduct:', thisProduct);
            // Check product stock available or not
            //       10             <          9           + 2   => 10 < 11 => true
            
            if(cartProduct !== null)
            {
                if (thisProduct.quantity < cartProduct.quantity + qty) {
                    return res.status(400).json({success: false, error: "Out of stock"});
                }
            }


            if (!cartProduct || cartProduct === null || cartProduct.length<1) {
                await new cartModel({
                    username,
                    productId,
                    quantity: qty
                }).save();
    
                return res.status(200).send({
                    success: true,
                    message: "cart created and item added successfully",
                });
            } 
            
            else {
                // product cart main already mojood hay is user k behalf pay
                // sirf qty increase kerni hay

                await cartModel.findOneAndUpdate({
                    username,
                    productId
                }, {
                    $inc: { quantity: qty }
                })

                return res.status(200).send({
                    success: true,
                    message: "Item added to cart successfully",

                });
            }


        } catch (error) {
            console.log(error)
            return res.status(400).send({
                success: false,
                message: "error iin adding itm into cart",
                error: error.message
            })
        }
    },
    async removeFromCart(req, res) {
        try {
            const productId = req.params.productId;
            console.log("productId:", productId);
            const qty = req.body.qty;
            const username = req.userId;
            console.log('usernam:',username)

            // const checkUser = await cartModel.findOne({ username, productId })
            const thisProduct = await cartModel.findOne({productId,username})
            console.log('thisProduct:', thisProduct)


            if (thisProduct.quantity > 1) {
                console.log('agaya')

                 await cartModel.findOneAndUpdate(
                    { $and: [{ username: username }, { productId: productId }] },
                    { $inc: { quantity: -qty } },
                    { new: true }
                );
               
               return res.status(200).send({
                    success: true,
                    message: "Item remmoved from cart successfully",

                });

            }
            else {
                return res.status(400).send({
                    success: false,
                    message: "can not removed item anymore ",

                });

            }

        } catch (error) {
            console.log(error)
            return res.status(400).send({
                success: false,
                message: "something went wrong",
                error: error.message
            })
        }
    },

    // reove complete single product from cart

    async removeProduct(req, res) {
        try {
            const productId = req.params.productId;
            const { username } = req.body
            if (!productId || !username) {
                return res.status(400).send({
                    success: false,
                    message: "all fields are required",
                });
            }

            const cart = await cartModel.findOneAndDelete({ $and: [{ username: username }, { productId: productId }] })
            console.log('cart:', cart)
            if (cart) {
                return res.status(200).send({
                    success: true,
                    message: "product deleted successfully",
                })
            }
            else {
                return res.status(200).send({
                    success: false,
                    message: "product not found",
                })
            }
        } catch (error) {
            console.log(error)
            return res.status(400).send({
                success: false,
                message: "something went wrong while removing product"
            })
        }
    },

    // get product on username basis

    async getcartOfUser(req, res) {
        try {

            // const { username } = req.body;
            const username = req.userId;
            console.log('username:',username)
            const cart = await cartModel.find({ username }).populate({
                path: 'productId',
                select: ['price'],

            })
            console.log('cart:', cart)

            
            if (!cart) {
                return res.status(400).send({
                    success: false,
                    message: "no usernme found"
                })
            }
            if (cart) {
                let total = 0;

                cart.forEach(item => {
                    item.total = item.productId.price * item.quantity;

                    total += item.total;
                });

                console.log(total);
                return res.status(200).send({
                    success: true,
                    message: `prodcut got succesfuuly of ${username}`,
                    cart,
                    total
                })
            }
            else {
                return res.status(400).send({
                    success: false,
                    message: "no cart found"
                })
            }
        } catch (error) {
            console.log(error)
            return res.status(401).send({
                success: false,
                message: "something went wromg while getting product",
                error: error.message
            })
        }
    },
    async getProductById(req, res) {
        try {
            const productId = req.params.productId;
            const { username } = req.body;

            const cart = await catModel.find({ username })

            if (cart) {
                return res.status(200).send({
                    success: true,
                    message: "cart got succesfuly",
                    cart
                })
            }
            else {
                return res.status(400).send({
                    success: false,
                    message: "no cart found",
                    cart
                })
            }

        } catch (error) {
            console.log(error)
            res.status(400).send({
                success: false,
                message: "something went wrong",
                error: error.message
            })
        }
    }

}

module.exports = cartController;
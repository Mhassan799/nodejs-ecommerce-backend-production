const productModel = require('../model/productModel')
const fs = require('fs')
const categoryModel = require('../model/categoryModel')
const userModel = require('../model/userModel')


const productConntroller = {

    // create product
    async create(req,res){
        const {name,price,quantity,description, categoryId,status,material,color, size} = req.body;
        console.log(req.body)
        console.log(name)
        try {
            
                    
                    if(!name || name == "")
                       { return res.status(401).send({
                            success:false,
                            message:"name feild required"
                        })}


                        if(!price)
                           { return res.status(401).send({
                                success:false,
                                message:"price feild required"
                            })}
                        if(!quantity)
                            {return res.status(401).send({
                                success:false,
                                message:"quantity feild required"
                            })}
                        if(!categoryId)
                            {return res.status(401).send({
                                success:false,
                                message:"categoryId feild required"
                            })}
                        if(!status)
                            {return res.status(401).send({
                                success:false,
                                message:"status feild required"
                            })}
                       if(!material)
                            {return res.status(401).send({
                                success:false,
                                message:"material feild required"
                            })}
                        if(!description)
                            {return res.status(401).send({
                                success:false,
                                message:"description feild required"
                            })}
                        if(!color)
                            {return res.status(401).send({
                                success:false,
                                message:"color feild required"
                            })}
                   
                  
                    const existingProduct = await productModel.findOne({name})
                    // check existing product
                    if(existingProduct){
                        res.status(401).send({
                            success:false,
                            message:"this product already exist"
        
                        })
        
        
        
                    }
                    const product = new productModel({
                      
                        ...req.body,
                        
                        
                    }) 
                    await product.save()
            
                    res.status(200).send({
                        success:true,
                        message:"product created succesfuly",
                        product,
                    })
        }
            
        catch (error) {
            console.log(error);
            res.status(401).send({
                success:false,
                message:"error in creating product",
                error:error.message
            })
        }
    },

    // get pproducts

    async getAllProducts(req,res){

        try {
            const data = req.body;
            const payload = {}

            if(data.category){
                payload.category = data.category;
            }
            const product = await productModel.find(payload)
        res.status(200).send({
            success:true,
            message:"got all product succesfully",
            product,
        })
        } catch (error) {
            console.log(error);
            res.status(401).send({
                success:false,
                message:"error in getting products",
                error:error.message
            })
        }
    },

    // get single product

    async getSingleProduct(req,res){

        try {
            const productId = req.params.productId;
            const product = await  productModel.findOne({productId});
            res.status(200).send({
                success:true,
                message:"got product siccesfuly",
                product,
            })
        } catch (error) {
            console.log(error);
            res.status(401).send({
                success:false,
                message:"error in gettng product",
                error:error.message
            })
        }
    },

    // update product

    async UpdateProduct(req,res){
        try {
            const productId= req.params.id;
            const {name,price,quantity,categoryId,
                description,material, status,color,size} = req.body;
            const product = await productModel.findByIdAndUpdate(productId,{name,price,quantity,categoryId,
            description,material, status,color,size})
            res.status(200).send({
                success:true,
                message:"product upddated succesfully",
                product
            })
        } catch (error) {
            console.log(error);
            res.status(401).send({
                success:false,
                message:"error in updating product",
                error:error.message
            })
        }
    },

    // delete product

    async deleteProduct(req,res){
        try {
            const productId = req.params.id;
            const product = await productModel.findByIdAndDelete(productId)
            res.status(200).send({
                success:true,
                message:"product deleted succesfully",
                product
            })
        } catch (error) {
            console.log(error);
            res.status(401).send({
                success:false,
                message:"error in updating product",
                error:error.message
            })
        }
    },

    // like and dislike product api

    async likeProduct(req,res){
        try {
            
            // const {likes} = req.body;
            const productId = req.params.id;
            const product = await productModel.findByIdAndUpdate(productId,{$inc:{likes:1}},{new:true})
            res.status(200).send({
                success:true,
                message:"you likes  this product",
                product

            })
            
        } catch (error) {
            console.log(error)
            res.status(401).send({
                success:false,
                message:"somethig went wrong while liking product",
                error:error.message,
            })
        }
    },

    async dislikeProduct(req,res){
        try {

            const productId = req.params.id;
            const product = await productModel.findOne({_id:productId})
            if( product.likes >1)
           { 
            const product = await productModel.findByIdAndUpdate(productId,{$inc:{likes:-1}},{new:true})
            return res.status(200).send({
                success:true,
                message:"you dislike this product",
                product

            })
        }
        else{
            return res.status(200).send({
                        success:false,
                        message:"you can not dislike this product anymore",
                        
        
                    })
        }
           
        } catch (error) {
            console.log(error)
            res.status(401).send({
                success:false,
                message:"somethig went wrong",
                error:error.message,
            })
        }
    },

    async viewProduct(req,res){
        try {
            const productId = req.params.id;
            const product = await productModel.findByIdAndUpdate(productId,{$inc:{views:1}},{new:true})
            res.status(200).send({
                success:true,
                message:"you have viewed this product",
                product

            })

        } catch (error) {
            console.log(error)
            res.status(401).send({
                success:false,
                message:"somethig went wrong",
                error:error.message,
            })
        }
        },

         async filterProducts(req,res){
            try {
                let size = req.query.size;
                let color = req.query.color;

                console.log("color",color);
                let material = req.query.material;
                let category = req.query.category;
                    let products = {}
                if(size){
                    products.size= { $in: Array.isArray(size) ? size : [size] } 
                    ;
                }
                if(color){
                    products.color = { $in: Array.isArray(color) ? color : [color] } 
                }
                if(material){
                   products.material=  { $in: Array.isArray(material) ? material : [material] } ;
                }
                if(category){
                     products.category={ $in: Array.isArray(category) ? category : [category] }  ;
                }


                console.log("products",products);
                 const product = await productModel.find(products)

                 res.status(200).send({
                    success:true,
                    message:"got products",
                    product
                 })

            }
          catch (error) {
                console.log(error)
                res.status(401).send({
                    success:false,
                    message:"somethig went wrong while filtering products",
                    error:error.message,
                })
            }
         },

         async productList(req,res){
            try {
                const perPage = 2;
                const page = req.params.page ? req.params.page:1;
                const product = await productModel.find({}).skip((page-1)*perPage).limit(perPage)
                res.status(200).send({
                    success:true,
                    message:"got products",
                    product
                })
            } catch (error) {
                console.log(error)
                res.status(401).send({
                    success:false,
                    message:"somethig went wrong while loading products",
                    error:error.message,
                })
            }
         },

         async productSearch(req,res){
            try {
                const {keyword} = req.query;
                console.log("KKKK",keyword);

                if(keyword == null || keyword === ""){
                    console.log('aya')
                    const product = await productModel.find({});
                    return res.status(200).send({
                        success: true,
                        message: "All products fetched successfully",
                        product
                    });
                }
               
                const product  = await  productModel.find({
                    $or :[
                        {name:{$regex:keyword,$options:"i"}},
                        {description:{$regex:keyword,$options:"i"}},
                    ]
                })  

                console.log('product:',product)
                if(product.length>0)
               {
                return res.status(200).send({
                    success:true,
                    message:"got filtered product",
                    product
                });
               }
                
               else {
                res.status(400).send({
                    message: "No matching products found",
                    products: product,
                });
            }
        
        }
        
            
            catch (error) {
                console.log(error)
                res.status(400).send({
                    success:false,
                    message:"something wrong",
                    error:error.message
                })
            }
         }

   
   
    }



module.exports = productConntroller;
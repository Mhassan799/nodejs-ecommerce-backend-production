const categoryModel = require('../model/categoryModel');

const categoryController = {
    async create(req,res){
        const {name, status} = req.body;
        console.log(req.body)
        try {
            if(!name || !status){
                return res.status(400).send({
                success:false,
                message:"all felds are required",
                
                })
            }
            // check existing category
            const existingcategory = await categoryModel.findOne({name})
            if(existingcategory){
            return res.status(401).send({
                success:false,
                message:"this category already exist",
                
            })
        }

            const newCategory = new categoryModel({
                name,
                status,
                
            })
            await newCategory.save()

            res.status(200).send({
                success:true,
                message:"new category created succesfully",
                
            })
            
        } catch (error) {
            console.log(error);
            res.status(401).send({
                success:false,
                message:"error in creating category",
                error:error.message
            })
        }
    },

    // get categories

        async getAllCategories(req,res){
            try {
                const category = await categoryModel.find({})
                res.status(200).send({
                    success:true,
                    message:"all categoriess got succesfully",
                    category
                })
                console.log('categor:',category)
            } catch (error) {
                console.log(error);
                res.status(401).send({
                    success:false,
                    message:"error in getting category",
                    error:error.message,
                })
            }
        },

        // get single category

        async getSingleCategory(req,res){
            try {
                catgryId= req.params.id;
                const category = await categoryModel.findOne({_id:catgryId})
                res.status(200).send({
                    success:true,
                    message:"got single category succsfully",
                    category
                })
            } catch (error) {
                console.log(error);
                res.status(401).send({
                    success:false,
                    message:"error in getting category",
                    error:error.message,
                })
            }
        },

        // update category

        async updateCategory(req,res){
            try {
                const {name,status} = req.body;
                const categoryId = req.params.id
                const category = await categoryModel.findByIdAndUpdate(categoryId,{name,status})
                res.status(200).send({
                    success:true,
                    message:"category updated succesfully",
                    category,
                })

                
            } catch (error) {
                console.log(error);
                res.status(401).send({
                    success:false,
                    message:"error in updating category",
                    error:error.message,
                })
            }
        },

        // delete category

        async deleteCategory(req,res){
            try {
                const {name}= req.body;
                const categoryId = req.params.id;
                const category = await categoryModel.findByIdAndDelete(categoryId);
                res.status(200).send({
                    success:true,
                    message:"category deleted succesfully",
                    category,
                })
            } catch (error) {
                console.log(error);
                res.status(401).send({
                    success:false,
                    message:"error in updating category",
                    error:error.message,
                })
            }
            }
        }


module.exports = categoryController;
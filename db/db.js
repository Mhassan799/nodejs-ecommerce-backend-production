const mongoose = require('mongoose')

async function connectDb(){
    try {
        await mongoose.connect(
            process.env.MONGO_URL,{
                // useNewUrlParser:true
            }
        )
        console.log('database connected succesfully')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDb;
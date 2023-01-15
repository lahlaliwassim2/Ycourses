const mongoose = require('mongoose')
module.exports = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected To MongooDB ^_^")
    } catch (error) {
        console.log("Connection Failed To MongoDB",error)
    }
}
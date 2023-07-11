const  mongoose = require ('mongoose')
// mongoose.connect('mongodb://127.0.0.1:27017/FirstProject')
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DATABASE_URL)
    }catch (error) {
        console.log(error)
    }
}

module.exports = connectDB
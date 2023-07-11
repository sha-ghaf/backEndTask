const mongoose = require ('mongoose')
const validator = require ('validator')
// const bcryptjs = require ('bcryptjs')
// const jwt = require ('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required : true,
        trim : true
    },
    password : {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        validate(value){
            let password = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");
            if(!password.test(value)){
                throw new Error("Password must include uppercase , lowercase , numbers , special characters")
            }
        }
    },
    email : {
        type: String,
        required: true,
        trim: true,
        lowercase : true,
        unique: true,
        validate(val){
            if(!validator.isEmail(val)){
                throw new Error ('Email is INVALID')
            }
        }
    },
    roles:{
        type: String,
        default: ['Employee']
    },
    active:{
        type: Boolean,
        default: true
    },
    tokens : [
        {
            type: String,
            required : true
        }
    ]
})

userSchema.virtual ('Note' , {
    ref: 'Note',
    localField : "_id",
    foreignField :"owner"
})

module.exports = mongoose.model('User', userSchema)
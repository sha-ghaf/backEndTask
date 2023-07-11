const User = require('../../helpers/schema/userSchema.js')
const {
    notFoundResponse,
	okResponse,
} = require('../../helpers/functions/ResponseHandler.js')

const getAllUsers = (req, res, next)=>{
    User.find({}).then((users)=>{
        return okResponse(res, "Users fetched successfully",{
            users
        })
    }).catch((error)=>{
        next(error)
    })
}

module.exports = getAllUsers
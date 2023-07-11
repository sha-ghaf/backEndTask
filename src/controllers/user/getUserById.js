const User = require('../../helpers/schema/userSchema.js')
const {
    notFoundResponse,
	okResponse,
} = require('../../helpers/functions/ResponseHandler.js')

const getUserById = (req, res, next) => {
    console.log(req.params)
    const _id = req.params.id
    User.findById(_id).then((user)=>{
        if(!user){
            return notFoundResponse(res, 'Unable to find user')
        }
        return okResponse(res, "User fetched successfully",{
            username: user.username,
            email: user.email,
            roles: user.roles,
            active: user.active
        })
    }).catch((error)=>{
        next(error)
    })
}

module.exports = getUserById
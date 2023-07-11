const {
	notFoundResponse,
	okResponse,
} = require('../../helpers/functions/ResponseHandler.js')
const internalError = require('../../helpers/functions/internalError.js')
const User = require('../../helpers/schema/userSchema.js')

const deleteUser = async(req,res)=>{
    try{
        const _id = req.params.id
        const user = await User.findByIdAndDelete(_id)
        if(!user){
            return notFoundResponse( res, 'Unable to find user')
        }
        return okResponse(res, "User deleted successfully")
    }
    catch(error){
        internalError
    }
}

module.exports = deleteUser

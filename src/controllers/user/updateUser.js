const {
	conflictResponse,
	okResponse,
} = require('../../helpers/functions/ResponseHandler.js')
const User = require('../../helpers/schema/userSchema.js')
const bcryptjs = require('bcrypt')

const updateUser = async( req, res, next ) => {
    try{
        const _id = req.params.id
        const updates = Object.keys (req.body)
        const user = await User.findById(_id );
        console.log(user)
        if (!user) {
            return conflictResponse(res, 'id not found');
        }
        const roles = req.body.roles
        console.log(typeof roles)
        if (roles.toString() !== "Employee" && roles.toString() !== "Admin" && roles.toString() !== "Manager"){
            return  conflictResponse(res, 'user should be Admin or Employee or Manager')
        }
        const hashedPassword = await bcryptjs.hash(req.body.password, 10);
            user.username = req.body.username,
            user.email = req.body.email,
            user.roles = req.body.roles,
            user.password = hashedPassword,
        await user.save();
        return okResponse(res, 'success to update user',{
            username: user.username,
            email: user.email,
            roles: user.roles,
            active: user.active
        })
    }catch(error){
        next(error)
    }
}

module.exports = updateUser

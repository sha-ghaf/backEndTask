const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    unAuthorizedResponse,
	okResponse,
    badRequestResponse,
} = require('../../helpers/functions/ResponseHandler.js')
const internalError = require('../../helpers/functions/internalError.js')
const User = require('../../helpers/schema/userSchema.js')

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return badRequestResponse (res, "email and password are required" )
        }
        const user = await User.findOne({ email });
        if (!user) {
            return unAuthorizedResponse(res, 'Invalid credentials' );
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return unAuthorizedResponse (res, 'Invalid credentials')
        }
        const token = jwt.sign(
            { userId: user._id }, 
            process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: '1h' }
        );
        return okResponse(res, "login success", 
            { user, token }
        );
    } catch (error) {
        console.error('An error occurred:', error);
        return internalError ;
    }
}

module.exports = login



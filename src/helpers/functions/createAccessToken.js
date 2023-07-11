const userSchema = require('../schema/userSchema.js')
const jwt = require ('jsonwebtoken')

const generateToken = async function () {
    const user = this 
    const token = jwt.sign ({_id:user._id.toString() } , "islam500")
    user.tokens = user.tokens.concat(token)
    await user.save()
    return token
}

module.exports = generateToken

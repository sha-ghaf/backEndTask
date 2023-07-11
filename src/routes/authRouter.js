const express = require ('express')
const AuthRouter = express.Router()
const AuthController = require('../controllers/auth/index.js')
const authenticate = require('../helpers/functions/auth.js')

AuthRouter.post('/login', AuthController.login)
// AuthRouter.get('/profile', authenticate, AuthController.profile)
// AuthRouter.delete('/logout', authenticate, AuthController.logout)



module.exports = AuthRouter
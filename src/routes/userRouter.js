const express = require ('express')
const UserRouter = express.Router()
const UsersController = require('../controllers/user/index.js')
const auth = require('../helpers/functions/auth.js')


UserRouter.post('/', UsersController.addUser)
UserRouter.get('/:id', UsersController.getUserById)
UserRouter.get('/', UsersController.getAllUser)
UserRouter.patch('/:id', UsersController.updateUser)
UserRouter.delete('/:id', UsersController.deleteUser)


module.exports = UserRouter
const express = require('express')
const {validateUserDetails} = require('./middleware.js')
const {createUser} = require('./controller.js')
const usersRouter = express.Router()
// usersRouter.use(express.json())

// create user
usersRouter.post('/', validateUserDetails, createUser)
// console.log('hi')


module.exports = usersRouter
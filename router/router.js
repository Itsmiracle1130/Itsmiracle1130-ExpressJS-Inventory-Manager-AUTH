const { Router } = require('express')
const itemRouter = require('./itemRouter.js')

const router = Router()

router.use('/items', itemRouter)

module.exports = router
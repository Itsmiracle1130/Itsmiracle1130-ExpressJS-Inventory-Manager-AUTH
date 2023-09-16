const express = require('express')
const {
    checkAdmin,
    checkApiKey
} = require('../Users/globalmiddleware.js')
const {
    createItem,
    getItems,
    getItem,
    updateItem,
    deleteItem
} = require('../item/src/controller/itemController.js')

const itemRouter = express.Router()

// itemRouter.use(express.json())

itemRouter.post('/', checkApiKey, checkAdmin, createItem)

itemRouter.get('/', checkApiKey, getItems)

itemRouter.get('/:id', checkApiKey, getItem)

itemRouter.patch('/:id', checkApiKey, checkAdmin, updateItem)

itemRouter.delete('/:id', checkApiKey, checkAdmin, deleteItem)

module.exports = itemRouter

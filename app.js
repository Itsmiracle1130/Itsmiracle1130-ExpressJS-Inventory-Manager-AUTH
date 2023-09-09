const express = require('express')
const usersRoute = require('./Users/usersRouter.js')
const itemsRoute = require('./router/itemRouter.js')
const app = express()
const port = 3000
app.use(express.json())

app.use('/v1/items', itemsRoute)
app.use('/users', usersRoute)

app.listen(port, () => {
    console.info(`Server is up at http://localhost:${port}`)
})
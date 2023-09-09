const fs = require('fs')
const path = require('path')
const userDbPath = path.join(__dirname, '../db', 'usersDb.json')
// console.log(userDbPath)

const checkApiKey = (req, res, next) => {
    try {
        const userDataBase = fs.readFileSync(userDbPath)
        const userDb = JSON.parse(userDataBase)
        // console.log(userDb)
        
        
        const apiKey = req.headers.apikey
        // console.log(authenticationHeader)
        
        if(!apiKey) {
            return res.status(401).send({
                message: 'You are not Authenticated, apiKey required'
            });
        }
        const foundUser = userDb.find((user) => user.apiKey === apiKey)
        // console.log(foundUser)
        if(!foundUser){
            return res.status(401).send({
                message: 'You are not Authenticated'
            })
        }
        next()
        
    } catch (error) {
        console.error(error)
}}

const checkAdmin = (req, res, next) => {
    try {
    const userDataBase = fs.readFileSync(userDbPath)
    const userDb = JSON.parse(userDataBase)

    const apiKey = req.headers.apikey

    const foundUser = userDb.find((user) => user.apiKey === apiKey)
    if (foundUser.userType !== "admin"){
        return res.status(401).send({
            message: "You are not authorized"
        })
    }
    next()
        
    } catch (error) {
        console.error(error)
}}

module.exports = {
    checkApiKey,
    checkAdmin
}
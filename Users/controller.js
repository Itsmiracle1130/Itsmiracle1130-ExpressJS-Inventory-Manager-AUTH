const fs = require('fs')
const path = require('path')
const dbPath = path.join(__dirname, '../db', 'usersDb.json')
// console.log(dbPath)

const createUser = async (req, res) => {
    try {
        // Read file from database and Parse
        const userData = fs.readFileSync(dbPath) 
        const userDb = JSON.parse(userData)
        // console.log(dbPath)

        const newUser = req.body
        newUser.apiKey = `${newUser.username}_${newUser.password}.2023`

        // Define Admin
        if (newUser.username === 'miracle') {
            newUser.userType = "admin"
        }
        else {
            newUser.userType = "user"
        }
        userDb.push(newUser)
        fs.writeFileSync(dbPath, JSON.stringify(userDb) )
        // console.log(newUser)
        return res.status(201).send({
            message: 'User Created Successfully',
            data: newUser
        })     
               
    } catch (error) {
        res.status(500).send({
            message: 'Ingternal Server Error'
        })
        console.log(error)
    }
}

module.exports = {
    createUser 
}

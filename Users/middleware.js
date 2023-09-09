const validateUserDetails = (req, res, next) => {
    try {
        if (!req.body.username || !req.body.username.trim()){
            return res.status(401).send({
                message: 'Username is required'
            })
        }
        else if (!req.body.password || !req.body.password.trim()){
            return res.status(401).send({
                message: 'Password is required'
            })
        }
        next()

    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    validateUserDetails
}
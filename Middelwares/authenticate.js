const jwt = require('jsonwebtoken')

const authenticate = (req,res,next)=>{
    const token = req.headers?.authorization?.split(" ")[1]
    if(token){
        const decoded = jwt.verify(token,'ravi')
        if(decoded){
            const userID = decoded.userID
            req.body.userID = userID
            next()
        }
        else{
            res.send("please Login")
        }
    }
    else{
        res.send('Please Login')
    }
}

module.exports = {
    authenticate
    // authenticate
}
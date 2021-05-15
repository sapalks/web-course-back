const jwt = require('jsonwebtoken')
const {secret} = require('../configs/config')

module.exports = function (req, res, next) {
    if(req.method === 'OPTIONS') {
        next() 
    }

    try{
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            return res.status(401).json({status: 'Error', message: 'Пользователь не авторизован'}) 
        }
        const decode = jwt.verify(token, secret)
        req.user = decode
        next()
    } catch(err) {
        console.log(err.message)
        return res.status(401).json({status: 'Error', message: 'Ошибка авторизации'}) 
    }
}
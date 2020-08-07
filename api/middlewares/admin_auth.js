const jwt = require('jsonwebtoken')

exports.adminAuthChecker = (req, res, next) => {
    if(req.cookies['queens_auth_token']) {
        try {
            const decoded = jwt.verify(req.cookies['queens_auth_token'],'PLEASE_CHANGE_IT_LATER')
            req.userData = decoded
            next()
        } catch (error) {
            res.status(401).json({success : false, msg : 'Auth Failed!'})
        }   
    }
    else {
        res.status(401).json({success : false, msg : 'Auth Failed!'})
    }
}


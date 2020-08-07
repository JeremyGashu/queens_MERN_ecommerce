const jwt = require('jsonwebtoken')

exports.superAdminAuthChecker = (req, res, next) => {
    if(req.cookies['queens_auth_token']) {
        try {
            const decoded = jwt.verify(req.cookies['queens_auth_token'],'PLEASE_CHANGE_IT_LATER')
            if(decoded.superAdmin) {
                req.userData = decoded
                next()
            }
            else {
                res.status(401).json({success : false, msg : 'Auth Failed!'})
            }
        } catch (error) {
            res.status(401).json({success : false, msg : 'Auth Failed!'})
        }   
    }
    else {
        res.status(401).json({success : false, msg : 'Auth Failed!'})
    }
}


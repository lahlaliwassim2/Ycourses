const jwt = require('jsonwebtoken')


// Verify Token 
function verifyToken(req,res,next) {
    const authToken = req.headers.authorization;
    if(authToken) {
        const token = authToken.split(' ')[1]
        try {
            const decodedPaylod = jwt.verify(token,process.env.PRIVATE_KEY);
            req.user = decodedPaylod;
            next();
        } catch (error) {
            return res.status(401).json({msg:"invalid token , acces denied"})
        }
    } else{
        return res.status(401).json({msg:"no token provided , acces denied"})
    }
}


// isAdmin
function verifyTokenAndAdmin(req,res,next) {
    verifyToken(req,res,()=>{
        if(!req.user.isAdmin) {
            res.status(401).json({msg:"not allowed , only admin"})
        }else {
            next()
        }
    })
}


// Only User Himself
function verifyTokenAndOnlyUser(req,res,next) {
    verifyToken(req,res,()=>{
        if(req.user.id == req.params.id) {
            next()
        }else {
            res.status(401).json({msg:"not allowed , only user himself"})
        }
    })
}


// Verify Token and Authorization
function verifyTokenAndAuthorization(req,res,next) {
    verifyToken(req,res,()=>{
        if(req.user.id == req.params.id || req.user.isAdmin) {
            next()
        }else {
            res.status(401).json({msg:"not allowed , only user himself or Admin"})
        }
    })
}


module.exports = {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndOnlyUser,
    verifyTokenAndAuthorization
}
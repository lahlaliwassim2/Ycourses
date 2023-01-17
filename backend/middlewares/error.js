//Error Hnadler Middleware 
const errorHandler = (err,req,res,next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    res.status(statusCode).json({
        msg:err.message,
        //stack  => chemin de l'erreur
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    })
}
module.exports = errorHandler

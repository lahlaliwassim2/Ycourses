//Not found 
const notFound = (req,res,next) => {
    const error = new Error(`not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

//Error Hnadler Middleware 
const errorHandler = (err,req,res,next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    res.status(statusCode).json({
        msg:err.message,
        //stack  => chemin de l'erreur
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    })
}
module.exports = {
    errorHandler,notFound
}

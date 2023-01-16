const path = require("path")
const multer = require('multer')



/* Creating a storage for the images. */
const photoStorage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null, path.join(__dirname, "../images"));
    },
    filename : function(req,file,cb) {
        if(file) {
            cb(null, new Date().toDateString().replace(/:/g,'-') + file.originalname);
        }else{
            cb(null,false);
        }
    }
});


/* Creating a multer object that will be used to upload the image. */
const photoUpload = multer({
    storage: photoStorage,
    fileFilter: function(req,file,cb){
        if(file.mimetype.startsWith("image")){
            cb(null,true)
        }else{
            cb({ message: "Unsupported file format"}, false)
        }
    },
    limits: { fileSize: 1024 *1024 } // 1megabyte
})
module.exports= photoUpload
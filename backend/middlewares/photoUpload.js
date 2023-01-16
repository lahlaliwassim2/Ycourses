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



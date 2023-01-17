const cloundinary = require('cloudinary')

cloundinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET, 
});


/**   Cloundinary Upload Image
 * It takes a file and uploads it to cloudinary
 * @param fileToUpload - The file to upload.
 * @returns The data object is being returned.
 */
const cloudinaryUploadImage = async(fileToUpload) =>{
    try {
        const data = await cloundinary.uploader.upload(fileToUpload, {
            resource_type: 'auto',
        });
        return data;
    } catch (error) {
        return error;
    }
}


 
/**     Cloundinary Remove Image
 * It takes an image public id as a parameter and returns a promise that resolves to the result of the
 * cloudinary uploader destroy function
 * @param imagePublicId - The public ID of the image you want to delete.
 * @returns The result of the promise.
 */
const cloudinaryRemoveImage = async(imagePublicId) =>{
    try {
        const result = await cloundinary.uploader.destroy(imagePublicId)
        return result;
    } catch (error) {
        return error;
    }
}
//Cloundinary Remove Multiple  Image
const cloudinaryRemoveMultipleImage = async(publicIds) =>{
    try {
        const result = await cloundinary.v2.api.delete_resources(publicIds)
        return result;
    } catch (error) {
        return error;
    }
}
module.exports={
    cloudinaryUploadImage,
    cloudinaryRemoveImage,
    cloudinaryRemoveMultipleImage
}


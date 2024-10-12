import { v2 as cloudinary} from "cloudinary"
import exp from "constants";
import fs from "fs"


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCLoudinary = async (localFilePath) => {
    try{
        if (!localFilePath) return null

        //Uploading a file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        })
        //file has been uploaded successfully
        //console.log("file has been uploaded to cloudinary",response.url)
        fs.unlinkSync(localFilePath) 
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) //remove the locally saved temporary file
        return null
    }
}

const deleteFromCloudinary = async (fileURL,deleteType) => {
    try {
        const urlParts = fileURL.split('/');
        const publicIdWithExtension = urlParts[urlParts.length - 1];
        const publicId = publicIdWithExtension.split('.')[0]; 
        
        //console.log(publicId)
        const response = await cloudinary.uploader.destroy(publicId, { resource_type: deleteType });
        return response;
    } catch (error) {
        console.error("Error deleting file from Cloudinary:", error);
        return null;
    }
};


export {uploadOnCLoudinary,deleteFromCloudinary}  
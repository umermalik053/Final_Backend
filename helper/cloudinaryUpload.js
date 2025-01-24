import multer from 'multer';
import dotenv from 'dotenv';


dotenv.config();

import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';



cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret:process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:(req,file)=> {
        let folder = "uploads"
        if(file.mimetype==="application/pdf"){
            folder = "uploads/pdf"
        }
        else{
            folder = "uploads/images"
        }
        return {folder};
      
    },
    allowedFormats: ['jpg', 'png', 'jpeg',"pdf"]
  });


const uploads = multer({ storage });

export default uploads;












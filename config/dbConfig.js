import mongoose from "mongoose";


export const dbconfig = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connected to the database');
        
    } catch (error) {
        console.error(error.message);
        
    }


}
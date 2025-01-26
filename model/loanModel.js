import mongoose from "mongoose";

const loanmodel = new mongoose.Schema({
    category:{type:String, required:true},
    subcategory:{type:String, required:true},
    deposit:{type:Number, required:true},
    loanAmount:{type:Number, required:true},
    loanPeriod:{type:Number, required:true},
    guarantor1:{type:mongoose.Schema.Types.ObjectId},
    guarantor2:{type:mongoose.Schema.Types.ObjectId},
    status: { type: String, enum: ["pending", "approved"], default: "pending" },

})

const loanModel =  mongoose.model('Loan', loanmodel)

export default loanModel;
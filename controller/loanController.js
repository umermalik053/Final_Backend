import loanModel from "../model/loanModel.js";



const loanController =  async (req,res) =>{
   try {
    const {category,subcategory,deposit,loanAmount,loanPeriod} = req.body;
    //Validation
    if(!category ||!subcategory ||!deposit ||!loanAmount ||!loanPeriod){
      return res.status(400).json({message: 'All fields are required'});
    }
    
    const newLoan = new loanModel({category,subcategory,deposit,loanAmount,loanPeriod});
    await newLoan.save();
    res.status(201).json({message: 'Loan request submitted successfully'});



    
   } catch (error) {
    console.log(error);
    
   }
}




export {loanController}
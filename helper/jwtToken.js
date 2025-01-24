
import dotenv from "dotenv"
import jwt from 'jsonwebtoken'

dotenv.config();

const generateJwtToken = (payload, expiresIn = "2d") => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  };
  

  
  export { generateJwtToken };
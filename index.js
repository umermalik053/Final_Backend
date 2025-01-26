import express from 'express';
import cors from 'cors';
import dotenv from "dotenv"
import { dbconfig } from './config/dbConfig.js';
import { authRoutes } from './routes/authRoutes.js';
import { loanRoutes } from './routes/loanRoutes.js';


const app = express();

// Middleware to parse JSON request bodies

app.use(express.json());
// Enable CORS for cross-origin requests

app.use(cors());

dotenv.config();

// Routes
app.use("/auth", authRoutes )
app.use("/loan", loanRoutes )

app.get('/', (req, res) => {
   return res.status(200).send({status: 'OK' , message:"welcome"});

});


const PORT = process.env.PORT || 8000
dbconfig()

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});




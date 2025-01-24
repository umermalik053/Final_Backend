import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();


const emailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.TRANSPORTER_EMAIL,
      pass: process.env.TRANSPORTER_PASSWORD,
    },
  });

  export default emailTransporter;



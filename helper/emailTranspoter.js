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

// const emailTransporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: 587,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_USER_PASSWORD,
//   },
// })

  export default emailTransporter;



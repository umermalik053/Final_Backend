import dotenv from "dotenv";
import emailTransporter from "./emailTranspoter.js";

dotenv.config();

// Send verification email

const sendVerificationEmail = async (
  verificationToken,
  url,
  email,
  subject,
  generatepassword
) => {
  console.log(verificationToken)
  try {
    const verificationLink = `${process.env.APP_URL}/${url}/${verificationToken}`;
    await emailTransporter.sendMail({
      from: process.env.TRANSPORTER_EMAIL,
      to: email,
      subject: subject,
      html: `<!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .email-header {
      background-color: #4CAF50;
      color: white;
      text-align: center;
      padding: 20px;
    }
    .email-body {
      padding: 20px;
      color: #333;
      line-height: 1.6;
    }
    .email-body a {
      color: #4CAF50;
      text-decoration: none;
      font-weight: bold;
    }
    .email-footer {
      background-color: #f4f4f4;
      text-align: center;
      padding: 10px;
      font-size: 12px;
      color: #888;
    }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            <h1>${subject}</h1>
          </div>
          <div class="email-body">

          <div>${generatepassword}<div>


            <p>Hi there,</p>
            <p>Thank you for signing up! Please click the button below to ${subject}</p>
            <p style="text-align: center;">
              <a href="${verificationLink}" style="background: #4CAF50; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none;">${subject}</a>
            </p>
            <p>If you did not sign up, please ignore this email.</p>
          </div>
          <div class="email-footer">
            <p>&copy; 2025 Blog Company. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
          `,
    });
  } catch (error) {
    console.error(error);
    // throw new Error("Failed to send verification email");
  }
};

export default sendVerificationEmail;

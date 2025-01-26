import bcrypt from "bcryptjs";
import authModel from "../model/authModel.js";
import generateToken from "../helper/cryptoToken.js";
import sendVerificationEmail from "../helper/sendEmail.js";
import { generateJwtToken } from "../helper/jwtToken.js";

// import necessary modules
const registerController = async (req, res) => {
  const { name, email, cnic } = req.body;
  // Validate the data
  if (!name || !email || !cnic) {
    return res.status(400).json({ message: "All fields are required." });
  }
  try {
    // Check if email already exists
    const existingUser = await authModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const generatepassword = generateToken(30)
    const verificationToken = generateToken(10);
    // Hash the password
    const hashedPassword = await bcrypt.hash(generatepassword, 10);
    const newUser =  new authModel({
      name,
      email,
      cnic,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 3600000, // 1 hour
    });

    await newUser.save();

    sendVerificationEmail(
      verificationToken,
      "verificationEmail",
      email,
      "Verify your Email",
      generatepassword,
    );
// 3eb38e9f5495486112f2e5902f4d02a750054b6fb2db9f5fe8e0d6f2e8e1
    res
      .status(201)
      .json({ message: "User registered. Please verify your email." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// verify email
const verifyEmailController = async (req, res) => {
  const { token } = req.params;
  console.log(token)

  try {
    const user = await authModel.findOne({
      verificationToken: token,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });
    console.log(user)

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token.", user: user });
    }

    user.emailVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpiresAt = null;
    await user.save();

    res.json({ message: "Email verified successfully." });
  } catch (err) {
    res.status(400).json({ message: "Invalid or expired token." });
  }
};
//   resendEmail
const resendEmailController = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await authModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }
    if (user.emailVerified) {
      return res.status(400).json({ message: "Email already verified." });
    }
    const verificationToken = generateToken(20);
    user.verificationToken = verificationToken;
    user.verificationTokenExpiresAt = Date.now() + 3600000; // 1 hour
    await user.save();
    sendVerificationEmail(
      verificationToken,
      "verificationEmail",
      email,
      "Verify your Email"
    );
    res.json({ message: "Verification email resent successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    if (!user.emailVerified) {
      return res.status(400).json({ message: "Email not verified." ,user});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password." });
    }

    const token = generateJwtToken({ email });
    res.json({ message: "Login successful.", token , user});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const forgotPasswordController = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await authModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    const resetToken = generateToken(32);
    
    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiresAt = Date.now() + 900000; // 15 minutes

    await user.save();

    sendVerificationEmail(
      resetToken,
      "resetPassword",
      user.email,
      "Reset your Password"
    );

    res.json({ message: "Password reset email sent." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const resetPasswordController = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await authModel.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = null;
    user.resetPasswordTokenExpiresAt = null;
    await user.save();

    res.json({ message: "Password reset successfully." });
  } catch (err) {
    res.status(400).json({ message: "Invalid or expired token." });
  }
};

export {
  registerController,
  loginController,
  verifyEmailController,
  resetPasswordController,
  forgotPasswordController,
  resendEmailController,
};

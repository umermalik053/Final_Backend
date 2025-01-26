import mongoose from "mongoose";

const authSchema = mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    cnic: { type: String, unique: true},
    password: { type: String },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    isActive: { type: Boolean, default: false },
    resetPasswordToken: { type: String },
    resetPasswordTokenExpiresAt: { type: Date },
    emailOtp: { type: String },
    emailOtpExpiresAt: { type: Date },
    verificationToken: { type: String },
    verificationTokenExpiresAt: { type: Date },
    emailVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const authModel = mongoose.model('user' , authSchema)

export default authModel;

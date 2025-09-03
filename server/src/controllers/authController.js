// const User = require("../models/User");
// const jwt = require("jsonwebtoken");
// const crypto = require("crypto");
// const sendEmail = require("../config/email");

// // Generate JWT Token
// const generateToken = (id, role) => {
//   return jwt.sign({ id, role }, process.env.JWT_SECRET, {
//     expiresIn: "7d",
//   });
// };

// // Register User
// exports.register = async (req, res) => {
//   try {
//     const { name, email, phone, password } = req.body;

//     const userExists = await User.findOne({ email });
//     if (userExists)
//       return res.status(400).json({ message: "User already exists" });

//     const user = await User.create({ name, email, phone, password });

//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       phone: user.phone,
//       token: generateToken(user._id, user.role),
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Login User
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "Invalid credentials" });

//     const isMatch = await user.matchPassword(password);
//     if (!isMatch)
//       return res.status(400).json({ message: "Invalid credentials" });

//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       phone: user.phone,
//       role: user.role,
//       token: generateToken(user._id, user.role),
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Forgot Password - Send OTP
// exports.forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
//     user.otp = otp;
//     user.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
//     await user.save();

//     await sendEmail(email, "Password Reset OTP", `Your OTP is: ${otp}`);

//     res.json({ message: "OTP sent to email" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Reset Password
// exports.resetPassword = async (req, res) => {
//   try {
//     const { email, otp, newPassword } = req.body;
//     const user = await User.findOne({ email, otp });

//     if (!user) return res.status(400).json({ message: "Invalid OTP" });
//     if (user.otpExpiry < Date.now())
//       return res.status(400).json({ message: "OTP expired" });

//     user.password = newPassword; // will auto-hash due to pre-save
//     user.otp = null;
//     user.otpExpiry = null;
//     await user.save();

//     res.json({ message: "Password reset successful" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

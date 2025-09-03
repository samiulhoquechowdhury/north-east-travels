const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
require("dotenv").config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const email = "admin@travel.com";
    const password = "Admin@123";

    let admin = await User.findOne({ email });
    if (!admin) {
      const hashed = await bcrypt.hash(password, 10);
      admin = new User({
        name: "Super Admin",
        email,
        password: hashed,
        role: "admin",
        phone: "9999999999",
      });
      await admin.save();
      console.log("✅ Admin user created:", email, "/", password);
    } else {
      console.log("⚡ Admin already exists:", email);
    }
    process.exit();
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
};

createAdmin();

const express = require("express");
const path = require("path");

const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tours", require("./routes/tourRoutes"));
app.use("/api/cars", require("./routes/carRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// Test route
app.get("/", (req, res) => res.send("API is running..."));
// ✅ Serve React frontend in production
// if (process.env.NODE_ENV === "production") {
//   const __dirname1 = path.resolve();
//   app.use(express.static(path.join(__dirname1, "client", "dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname1, "client", "dist", "index.html"));
//   });
// }

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

import { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const sendOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/forgot-password", {
        email,
      });
      alert("OTP sent to email");
      setStep(2);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/reset-password", {
        email,
        otp,
        newPassword,
      });
      alert("Password reset successful! You can now login.");
      setStep(1);
      setEmail("");
      setOtp("");
      setNewPassword("");
    } catch (err) {
      alert(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      {step === 1 ? (
        <form
          onSubmit={sendOtp}
          className="bg-white shadow-lg p-6 rounded-lg w-96"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">
            Forgot Password
          </h2>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border p-2 mb-3 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="bg-blue-600 text-white w-full py-2 rounded">
            Send OTP
          </button>
        </form>
      ) : (
        <form
          onSubmit={resetPassword}
          className="bg-white shadow-lg p-6 rounded-lg w-96"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">
            Reset Password
          </h2>
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full border p-2 mb-3 rounded"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full border p-2 mb-3 rounded"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button className="bg-green-600 text-white w-full py-2 rounded">
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
}

// import { useState, useContext } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// export default function AdminLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", {
//         email,
//         password,
//       });
//       if (res.data.role !== "admin") {
//         alert("Access denied! Not an admin.");
//         return;
//       }
//       login(res.data);
//       navigate("/admin");
//     } catch (err) {
//       alert(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-[80vh]">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-lg p-6 rounded-lg w-96"
//       >
//         <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full border p-2 mb-3 rounded"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full border p-2 mb-3 rounded"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

// src/pages/AdminLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin, isAdminLoggedIn } from "../utils/authAdmin";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // if already logged in send to admin home
  if (isAdminLoggedIn()) {
    navigate("/admin", { replace: true });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const res = loginAdmin({ email: email.trim(), password });
    if (res.ok) {
      navigate("/admin", { replace: true });
    } else {
      setError(res.message || "Invalid credentials");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded p-6">
        <h2 className="text-2xl font-semibold mb-4">Admin Login</h2>
        {error && <div className="text-red-600 mb-3">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              type="email"
              placeholder="sam@admin.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              type="password"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded bg-blue-600 text-white font-medium"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-sm text-gray-500">
          Demo creds: <br />
          <strong>email:</strong> sam@admin.com <br />
          <strong>password:</strong> Sam@admin
        </div>
      </div>
    </div>
  );
}

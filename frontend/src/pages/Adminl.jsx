import React from "react";
import img from "../assets/back.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function Adminl() {
  const [mail, setMail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const Backend_url = import.meta.env.VITE_BACKEND_URL

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mail || !password) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Please fill in all fields",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    const email = mail;
    try {
      const response = await axios.post(
        `${Backend_url}admin/login`,
        { email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const token = response.data.token;
      if (response.data.success) {
        setLoading(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login successful",
          showConfirmButton: false,
          timer: 1500,
        });
        localStorage.setItem("aToken", token);
        navigate("/");
      } else if (response.data.errors) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Login failed: " + response.data.errors,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Login failed: " + response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      console.error("Error during login:", err);
      setLoading(false);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Invalid credentials or server error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div
      className="bg-transparent backdrop-blur-[20px] md:backdrop-blur-none w-full h-screen flex md:justify-center md:items-center"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-transparent border-2 border-[#ffffff]/20 backdrop-blur-[20px] p-8 rounded-lg shadow-xl max-w-md w-full">
        <form className="space-y-6" type="submit" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center text-white">Login</h2>
          <div>
            <label className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              type="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none bg-white"
              placeholder="Enter your email"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none bg-white "
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <p className="text-sm text-white text-center">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="hover:text-white/80 hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
          <div className="w-full flex justify-between items-center">
            <button
              className="w-[40%] mx-auto py-2 px-4 bg-white font-semibold rounded-full hover:bg-white/70 hover:cursor-pointer"
              onClick={() => setLoading(true)}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

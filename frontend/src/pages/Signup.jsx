import React from "react";
import img from "../assets/back.jpg";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import axios from "axios";
import Swal from "sweetalert2";
import PhoneInput from "react-phone-input-2";

export default function Signup() {
  const [mail, setMail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phoneNo, setphoneNo] = React.useState("");
  const navigate = useNavigate();

  const Backend_url = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mail && !password && !firstName && !lastName && !phoneNo) {
      Swal.fire({
        position: "center",
        icon: "Error",
        title: "All fields are required",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
    const email = mail;
    try {
      const response = await axios.post(`${Backend_url}user/signup`, {
        firstName,
        lastName,
        phoneNo,
        email,
        password,
      });
      const { success, message, errors } = response.data;

      if (errors) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: `${errors}`,
          showConfirmButton: false,
          timer: 2000,
        });
      } else if (message) {
        Swal.fire({
          position: "center",
          title: `${message}`,
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/login");
        setLoading(false);
      }

      if (success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Signup successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/login");
      } else {
        alert("Signup failed: " + response.data);
      }
    } catch (error) {
      const issues = error?.response?.data?.issues;
      const message =
        error?.response?.data?.message || error?.response?.data?.errors;

      if (issues) {
        Swal.fire({
          position: "center",
          title: `${issues}`,
          showConfirmButton: false,
          timer: 2000,
        });
      } else if (message) {
        Swal.fire({
          position: "center",
          title: `${message}`,
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Unexpected error",
          showConfirmButton: false,
          timer: 2000,
        });
      }

      setLoading(false);
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
      <div className="bg-transparent md:border-2 border-[#ffffff]/20 backdrop-blur-[20px] p-8 rounded-lg shadow-xl max-w-md w-full">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center text-white">Signup</h2>
          <div className="flex gap-8">
            <div>
              <label className="text-sm font-medium text-white">
                First Name
              </label>
              <input
                type="text"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none bg-white"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label className=" text-sm font-medium text-white">
                Last Name
              </label>
              <input
                type="text"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none bg-white"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-5">
            <PhoneInput
              country={"in"}
              value={phoneNo}
              onChange={(e)=>setphoneNo("+" + e)}
              inputStyle={{
                border: "none",
                width: "100%",
                backgroundColor: "white",
                color: "black",
                padding: "10px",
                outline: "none",
                borderRadius: "5px",
              }}
              className="text-white focus:outline-none w-full"
            />
          </div>
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
              Already have an account?{" "}
              <Link to="/login" className="hover:text-white/80 hover:underline">
                Login
              </Link>
            </p>
          </div>
          <div className="w-full flex justify-between items-center">
            <button
              type="submit"
              className="w-[40%] mx-auto py-2 px-4 bg-white font-semibold rounded-full hover:bg-white/70 hover:cursor-pointer"
              onClick={() => setLoading(true)}
            >
              {loading ? "Loading..." : "Signup"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

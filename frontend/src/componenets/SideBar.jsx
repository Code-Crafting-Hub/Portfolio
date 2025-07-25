import React, { useState } from "react";
import { FaUser, FaHome, FaCog, FaSignOutAlt, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { SiOpenproject } from "react-icons/si";
import Swal from "sweetalert2";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false); // mobile menu toggle

  const Backend_url = import.meta.env.VITE_BACKEND_URL

  const logOutHandler = async () => {
    try {
      await axios.post(
        `${Backend_url}user/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Logout successful",
        showConfirmButton: false,
        timer: 1500,
      });
      localStorage.removeItem("aToken");
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const SidebarContent = () => (
    <>
      {/* Title */}
      <Link to="/dashboard">
        <div className="text-2xl font-bold p-6 border-b hover:cursor-default">
          Admin Panel
        </div>
      </Link>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-4">
        <Link
          to="/"
          className="flex items-center gap-3 p-3 rounded-md hover:text-[var(--primary-accent)] hover:bg-white transition"
        >
          <FaHome />
          <span>Home</span>
        </Link>
        <Link
          to="/users"
          className="flex items-center gap-3 p-3 rounded-md hover:text-[var(--primary-accent)] hover:bg-white transition"
        >
          <FaUser />
          <span>Users</span>
        </Link>
        <Link
          to="/projects"
          className="flex items-center gap-3 p-3 rounded-md hover:text-[var(--primary-accent)] hover:bg-white transition"
        >
          <SiOpenproject />
          <span>Projects</span>
        </Link>
        <Link
          to="/settings"
          className="flex items-center gap-3 p-3 rounded-md hover:text-[var(--primary-accent)] hover:bg-white transition"
        >
          <FaCog />
          <span>Settings</span>
        </Link>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t">
        <button
          className="flex items-center gap-2 p-3 w-full hover:text-[var(--primary-accent)] hover:bg-white rounded-md transition hover:cursor-pointer"
          onClick={logOutHandler}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="transition-transform transform translate-x-0 hidden lg:flex w-64 h-screen bg-[var(--primary-accent)] text-white flex-col fixed left-0 top-0 shadow-lg z-50">
        <SidebarContent />
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between bg-[var(--primary-accent)] text-white p-4 fixed top-0 left-0 right-0 z-50 shadow-md">
        <div className="text-xl font-bold">Admin Panel</div>
        <FaBars
          className="text-2xl cursor-pointer"
          onClick={() => setIsOpen(true)}
        />
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-0 left-0 w-64 h-full bg-[var(--primary-accent)] text-white z-50 shadow-lg flex flex-col animate-slide-in">
            <div className="p-4 text-right">
              <button
                onClick={() => setIsOpen(false)}
                className="text-white text-xl"
              >
                ✕
              </button>
            </div>
            <SidebarContent />
          </div>
        </>
      )}
    </>
  );
}

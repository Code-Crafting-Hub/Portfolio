/* eslint-disable no-unused-vars */
import React from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Logout() {

  const Backend_url = import.meta.env.VITE_BACKEND_URL

  const logOutHandler = async ({ onSendData }) => {
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
      localStorage.removeItem("token");
      localStorage.removeItem("aToken");
      if (onSendData) {
        onSendData(false); 
      }
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <button
      onClick={logOutHandler}
      className="font-semibold text-[var(--color-text)] rounded hover:cursor-pointer px-3 py-1 border-2 hover:bg-[var(--hover-button)] transition delay-150 duration-300 hover:border-[var(--hover-button)]"
    >
      Logout
    </button>
  );
}

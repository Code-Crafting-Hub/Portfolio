import React from "react";
import { useNavigate } from "react-router-dom";

export default function LoginButton() {
  const navigate = useNavigate();
  const nevigation = () => {
    navigate("/login");
  };
  return (
    <button
      className="font-semibold rounded px-3 py-1 border-2 hover:bg-[var(--hover-button)] hover:border-[var(--primary-accent)] transition delay-150 duration-300 hover:cursor-pointer hover:text-white"
      onClick={nevigation}
    >
      Login
    </button>
  );
}

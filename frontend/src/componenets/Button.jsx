/* eslint-disable no-unused-vars */
import React from "react";

export default function Button({ name, type = "button", url }) {
  return (
    <button
      className="w-fit py-2 px-6 rounded-full bg-[var(--secondary-accent)] hover:bg-[var(--hover-button)]  transition delay-100 duration-300 font-semibold hover:cursor-pointer shadow-md shadow-green-800 text-white"
      type={type}
      onClick={url}
    >
      {name}
    </button>
  );
}

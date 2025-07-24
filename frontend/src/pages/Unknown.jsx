/* eslint-disable no-unused-vars */
import React from "react";
import Button from "../componenets/Button";
import { useNavigate } from "react-router-dom";

export default function Unknown() {
    const navigate = useNavigate()
    const pageNavigate = ()=>{
        navigate("/")
    }
  return (
    <div className="flex justify-center items-center h-screen bg-[var(--light-background)] text-[var(--heading-border)]">
      <div>
        <p className="font-semibold text-4xl">404 Page not found</p>
        <p className="text-center mt-5">
          <Button name="Home" url={pageNavigate} />
        </p>
      </div>
    </div>
  );
}

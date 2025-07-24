/* eslint-disable no-unused-vars */
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../componenets/SideBar";

export default function Dashboard() {
  const token = localStorage.getItem("aToken")
  const navigate = useNavigate()

  const adminVerify = ()=>{
    if(!token){
      navigate("/")
    }
  }

  React.useEffect(()=>{adminVerify()},[])

  return (
    <>
      <div className="felx bg-[var(--color-background)] h-screen">
        <SideBar />
        <p className="flex justify-center items-center text-9xl font-bold text-[var(--color-text)] p-[15rem]">
          Dashboard
        </p>
      </div>
    </>
  );
}

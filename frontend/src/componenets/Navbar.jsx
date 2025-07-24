/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Logout from "./Logout";
import LoginButton from "./LoginButton";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const atoken = localStorage.getItem("aToken");
  const [userLogin, setUserLogin] = useState(false);
  const [adminLogin, setAdminLogin] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [responsive, setResponsive] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setUserLogin(!!token);
  }, [token]);

  useEffect(() => {
    if (atoken) {
      setAdminLogin(true);
      setUserLogin(true);
    } else {
      setAdminLogin(false);
    }
  }, [atoken]);

  const adminDashboard = () => navigate("/dashboard");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      const scrollY = window.scrollY;

      sections.forEach((sec) => {
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute("id");

        if (scrollY >= offset && scrollY < offset + height) {
          setActiveLink(id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = (
    <>
      <a
        href="#home"
        className={`text-white font-semibold md:text-[var(--color-text)] rounded-4xl px-3 py-1 delay-300 ${
          activeLink === "home" ? "border-b-4 border-[var(--secondary-accent)]" : ""
        }`}
      >
        Home
      </a>
      <a
        href="#about"
        className={`text-white font-semibold md:text-[var(--color-text)] rounded-4xl px-3 py-1 delay-300 ${
          activeLink === "about" ? "border-b-4 border-[var(--secondary-accent)]" : ""
        }`}
      >
        About
      </a>
      <a
        href="#services"
        className={`text-white font-semibold md:text-[var(--color-text)] rounded-4xl px-3 py-1 delay-300 ${
          activeLink === "services" ? "border-b-4 border-[var(--secondary-accent)]" : ""
        }`}
      >
        Services
      </a>
      <a
        href="#projects"
        className={`text-white font-semibold md:text-[var(--color-text)] rounded-4xl px-3 py-1 delay-300 ${
          activeLink === "projects" ? "border-b-4 border-[var(--secondary-accent)]" : ""
        }`}
      >
        Projects
      </a>
      <a
        href="#contact"
        className={`text-white font-semibold md:text-[var(--color-text)] rounded-4xl px-3 py-1 delay-300 ${
          activeLink === "contact" ? "border-b-4 border-[var(--secondary-accent)]" : ""
        }`}
      >
        Contact
      </a>
    </>
  );

  return (
    <div className="flex justify-between items-center bg-transparent shadow-lg fixed top-0 left-0 right-0 z-50 backdrop-blur-[20px] px-4 py-3">
      <div className="text-2xl font-bold cursor-default">Portfolio</div>

      {/* Mobile Toggle Button */}
      <div className="lg:hidden">
        <IoMdMenu
          className="text-3xl cursor-pointer"
          onClick={() => setResponsive(!responsive)}
        />
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex space-x-4 items-center pe-6">
        {navLinks}
        {userLogin ? <Logout onSendData={setUserLogin} /> : <LoginButton />}
        {adminLogin ? <Button name="Dashboard" url={adminDashboard} /> : ""}
      </div>

      {/* Mobile Navigation */}
      {responsive && (
        <div className="absolute top-[100%] left-0 right-0 bg-[var(--primary-accent)] shadow-md px-6 py-4 flex flex-col space-y-3 lg:hidden transition-all duration-300 z-40">
          {navLinks}
          {userLogin ? <Logout onSendData={setUserLogin} /> : <LoginButton />}
          {adminLogin ? <Button name="Dashboard" url={adminDashboard} /> : ""}
        </div>
      )}
    </div>
  );
}

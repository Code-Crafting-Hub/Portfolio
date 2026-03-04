import React, { useEffect } from "react";
import Navbar from "../componenets/Navbar";
import { FaExternalLinkAlt, FaSun, FaMoon } from "react-icons/fa";
import Button from "../componenets/Button";
import axios from "axios";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";
import "animate.css";
import ScrollReveal from "scrollreveal";
import Typed from "typed.js";
// import { useNavigate } from "react-router-dom";

export default function Home() {
  // const token = localStorage.getItem("token");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [esubject, setEsubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [projectData, setProjectData] = React.useState([]);
  const [Contact, setContact] = React.useState([]);
  const [theme, setTheme] = React.useState(true);
  const [services, setServices] = React.useState([]);
  const [typedJs, setTypedJs] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const [img, setImg] = React.useState([]);
  const [img2, setImg2] = React.useState([]);
  // const navigate = useNavigate();

  const Backend_url = import.meta.env.VITE_BACKEND_URL;

  const TemplateId = import.meta.env.VITE_TEMPLATE_ID;
  const ServiceId = import.meta.env.VITE_SERVICE_ID;
  const PublicKey = import.meta.env.VITE_PUBLIC_KEY;

  // const removeToken = async () => {
  //   const response = await axios.get(`${Backend_url}user/verify`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     withCredentials: true,
  //   });
  //   if (response.data.errors) {
  //     localStorage.removeItem("aToken");
  //     localStorage.removeItem("token");
  //     navigate(0);
  //   }
  // };

  //download CV

  const downloadCV = async () => {
    try {
      const response = await axios.get(`${Backend_url}user/download`, {
        responseType: "blob",
      });
      if (response.status !== 200) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Failed to Download CV",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      } else {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "CV Downloaded Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "CV.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  // getting user data

  // const userData = async () => {
  //   try {
  //     if (token) {
  //       const response = await axios.get(`${Backend_url}user/data`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       const { firstName, lastName, email } = response.data.user;
  //       setFirstName(firstName);
  //       setLastName(lastName);
  //       setEmail(email);
  //     }
  //   } catch (error) {
  //     console.error("Error in fetching user data:", error);
  //   }
  // };

  const adminContact = async () => {
    try {
      const response = await axios.get(`${Backend_url}data/contact`, {
        withCredentials: true,
      });
      setContact(response.data);
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Error in fetching contact data", "error");
    }
  };

  const projectSection = async () => {
    try {
      const response = await axios.get(`${Backend_url}data/projects`, {
        withCredentials: true,
      });
      if (!response) {
        console.log("response not received");
      }
      setProjectData(response.data);
    } catch (error) {
      console.log("error in fetching project data", error);
    }
  };

  const serviceSection = async () => {
    try {
      const response = await axios.get(`${Backend_url}data/service`);
      const services = response.data;
      setServices(services);
      setTypedJs(
        services
          .map((item) => item.name)
          .filter((name) => typeof name === "string" && name.trim() !== ""),
      );
    } catch (error) {
      console.error("Error in fetching user data:", error);
    }
  };

  const getImages = async () => {
    try {
      const response = await axios.get(`${Backend_url}data/image`);
      setImages(response.data);
    } catch (error) {
      console.log("error in getting images ", error);
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme ? "light" : "dark",
    );
  }, [theme]);

  useEffect(() => {
    // userData();
    projectSection();
    adminContact();
    serviceSection();
    getImages();
    // removeToken();
  }, []);

  useEffect(() => {
    if (images.length < 4) return;

    const timer = setTimeout(() => {
      const [light1, dark1, light2, dark2] = images;

      if (theme) {
        setImg(light1.image);
        setImg2(light2.image);
      } else {
        setImg(dark1.image);
        setImg2(dark2.image);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [images, theme]);

  const form = React.useRef();

  // Send mail

  const sendEmail = (e) => {
    e.preventDefault();

    if (!firstName || !esubject || !message || !email) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "All fields are required",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    if (!email) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Login first",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    if (!form.current) {
      console.error("Form reference is null.");
      return;
    }

    emailjs.sendForm(ServiceId, TemplateId, form.current, PublicKey).then(
      () => {
        e.target.reset();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Message sent",
          showConfirmButton: false,
          timer: 2000,
        });
        setEsubject("");
        setMessage("");
        setEmail("");
        setFirstName("");
        setLastName("");
      },
      () => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Failed to send message",
          showConfirmButton: false,
          timer: 2000,
        });
      },
    );
  };

  // scroll behaviour

  useEffect(() => {
    const sr = ScrollReveal({
      distance: "80px",
      duration: 2000,
      delay: 200,
    });

    sr.reveal("#home, #services, #contact", { origin: "top" });
    sr.reveal("#about, #projects", { origin: "bottom" });
  }, []);

  // floating image

  const floatStyle = {
    animation: "floatImage 4s ease-in-out infinite",
  };

  // typing animation

  const el = React.useRef(null);

  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: typedJs,
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 1000,
      loop: true,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, [typedJs]);

  return (
    <>
      <div className="bg-[var(--color-background)] min-h-screen text-[var(--color-text)]">
        <Navbar />
        <style>
          {`
          @keyframes floatImage {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-2.4rem);
            }
            100% {
              transform: translateY(0);
            }
          }
        `}
        </style>
        {/* First section */}
        <section
          className="min-h-screen text-[var(--color-text-primary)] 
             px-6 py-16 
             md:px-16 md:py-20 
             lg:h-[100vh] lg:p-[10rem] 
             flex flex-col-reverse lg:flex-row 
             items-center justify-center 
             gap-10 md:gap-16 lg:gap-[10rem]"
          id="home"
        >
          {/* LEFT CONTENT */}
          <div className="text-center lg:text-left max-w-2xl">
            <h3 className="text-2xl md:text-3xl lg:text-[2.8rem] font-bold leading-tight">
              Hello, It&apos;s Me
            </h3>

            <h1 className="text-3xl md:text-5xl lg:text-[4rem] font-bold leading-tight">
              Yashkaran Singh
            </h1>

            <h3 className="text-lg md:text-2xl lg:text-[2.4rem] font-bold leading-tight">
              I&apos;m a{" "}
              <span className="text-[var(--primary-accent)]" ref={el}></span>
            </h3>

            <p className="text-base md:text-lg lg:text-[1.6rem] mt-4 leading-relaxed">
              Dedicated and passionate Full Stack Developer with strong
              knowledge of modern web technologies.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex items-center justify-center lg:justify-start gap-4 my-6">
              {Contact.map((data) => {
                const { _id, image, link } = data;
                return (
                  <div key={_id}>
                    <a
                      href={link}
                      className="w-10 h-10 flex items-center justify-center 
                         hover:bg-white/70 
                         transition duration-300 
                         bg-white rounded-lg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={image.url} alt="" className="w-[70%]" />
                    </a>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center lg:justify-start">
              <Button name="Download CV" url={downloadCV} />
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="hidden lg:flex w-full max-w-md md:max-w-lg lg:max-w-none lg:w-[750px] justify-center">
            <img
              src={img.url}
              alt=""
              className="w-full lg:m-20"
              style={floatStyle}
            />
          </div>
        </section>
        {/* About section */}
        <section
          className="flex flex-col lg:flex-row 
             items-center justify-center 
             gap-12 md:gap-20 lg:gap-[10rem] 
             px-6 py-16 
             md:px-16 md:py-20 
             lg:p-[10rem] 
             bg-[var(--secondary-background)]"
          id="about"
        >
          {/* IMAGE */}
          <div className="hidden lg:flex w-full max-w-md md:max-w-lg lg:max-w-none lg:w-[750px] justify-center">
            <img
              src={img2.url}
              alt=""
              className="w-full lg:m-20"
              style={floatStyle}
            />
          </div>

          {/* CONTENT */}
          <div className="max-w-2xl text-center lg:text-left">
            <h2
              className="text-3xl md:text-5xl lg:text-[4.5rem] 
                   font-semibold leading-tight"
            >
              About <span className="text-[var(--primary-accent)]">Me</span>
            </h2>

            <h3
              className="text-xl md:text-2xl 
                   font-semibold 
                   text-[var(--secondary-accent)] mt-4"
            >
              MERN Stack Developer
            </h3>

            <p className="text-base md:text-lg mt-6 leading-relaxed">
              Dedicated and passionate MERN Stack Developer with strong
              knowledge of modern web technologies. Aspires to contribute
              effectively to a reputed organization by delivering robust,
              user-centric solutions while continually enhancing technical
              expertise.
            </p>
          </div>
        </section>
        {/* Services section */}
        <section
          className="px-6 py-16 
             md:px-16 md:py-20 
             lg:p-[4rem]"
          id="services"
        >

          <h2
            className="text-center 
                 text-3xl md:text-5xl lg:text-[4.5rem] 
                 font-semibold leading-tight"
          >
            My <span className="text-[var(--primary-accent)]">Services</span>
          </h2>

          <div
            className="flex flex-wrap 
                  justify-center 
                  items-stretch 
                  gap-8 md:gap-10 
                  mt-12"
          >
            {services.map((data) => {
              const { _id, name, description, link } = data;
              return (
                <div
                  key={_id}
                  className="flex flex-col justify-between 
                     bg-[var(--secondary-background)] 
                     p-6 md:p-8 
                     rounded-lg shadow-md 
                     text-center 
                     items-center 
                     transition duration-300 
                     hover:border-2 
                     hover:border-[var(--primary-accent)] 
                     hover:scale-105
                     
                     w-full 
                     sm:w-[45%] 
                     lg:w-[30%] 
                     max-w-[350px]"
                >
                  <h3 className="text-xl md:text-2xl font-semibold">{name}</h3>

                  <p className="mt-4 text-sm md:text-base leading-relaxed">
                    {description}
                  </p>

                  <div className="w-full flex justify-center mt-6">
                    <a
                      href={link}
                      className="w-fit py-2 px-6 
                         rounded-full 
                         bg-[var(--secondary-accent)] 
                         hover:bg-[var(--hover-button)]  
                         transition duration-300 
                         font-semibold 
                         shadow-md 
                         shadow-green-800 
                         text-white"
                    >
                      Get Service
                    </a>
                  </div>
                </div>
              );
            })}

            {/* <div className="flex flex-col justify-center bg-[var(--secondary-background)] p-5 rounded-lg shadow-md w-70 h-85 padding-[3rem 2rem 4rem] text-center items-center hover:border-2 hover:border-[var(--primary-accent)] transition duration-300 hover:scale-102">
              <div className="flex justify-center h-10">
                <FaCode className="text-4xl text-[var(--secondary-accent)]" />
              </div>
              <h3 className="text-2xl font-semibold">Web Development</h3>
              <p className="mt-2 h-[65%] overflow-hidden">
                Experienced web developer skilled in HTML, CSS, JavaScript, and
                responsive design, creating user-friendly websites with clean,
                efficient code.
              </p>
              <div className="w-full flex justify-center">
                <Button name="Learn More" />
              </div>
            </div> */}
          </div>
        </section>
        {/* Project section */}
        <section
          className="bg-[var(--secondary-background)] p-[1rem] md:p-[4rem]"
          id="projects"
        >
          <h2 className="text-center text-[4.3rem]/20 md:text-[4.5rem]/20 font-semibold mt-5">
            Latest{" "}
            <span className="text-[var(--primary-accent)]">Projects</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:px-28 md:py-5 mt-5">
            {projectData.map((data) => {
              const { _id, name, description, link, image } = data;

              return (
                <div
                  className="relative bg-white rounded-lg shadow-lg transition duration-300 overflow-hidden flex group"
                  key={_id}
                >
                  <img
                    src={image.url}
                    alt=""
                    className="w-full h-full transition-transform duration-300 transform group-hover:scale-105"
                  />

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-[var(--color-background)] to-[var(--primary-accent)] h-full flex flex-col items-center justify-center p-2 text-center transform translate-y-100 group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                    <h4 className="text-[2.5rem] text-[var(--primary-accent)]">
                      {name}
                    </h4>
                    <p className="text-[1rem] mt-[1rem] mb-[1rem] text-white">
                      {description}
                    </p>
                    <a
                      href={link}
                      className="inline-flex justify-center items-center mt-2 w-[2.8rem] h-[2.8rem] bg-[var(--primary-accent)] rounded-full hover:text-[var(--secondary-accent)]"
                    >
                      <FaExternalLinkAlt />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        {/* Contact section */}
        <section
          className="flex flex-col justify-center items-center p-3 md:p-[6rem] h-screen"
          id="contact"
        >
          <h2 className="text-center text-[4.3rem]/20 md:text-[4.5rem]/20 font-semibold my-5">
            Contact <span className="text-[var(--primary-accent)]">Me</span>
          </h2>
          <form
            onSubmit={sendEmail}
            ref={form}
            type="submit"
            className="md:max-w-[70rem] m-1 mx-auto gap-10"
          >
            <div className="flex flex-col md:flex-row md:gap-5 w-full">
              <input
                type="text"
                placeholder="First Name"
                className="bg-[var(--secondary-background)] rounded mt-5 px-4 py-1 w-full focus:outline-none"
                value={firstName || ""}
                name="fname"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="bg-[var(--secondary-background)] rounded mt-5 px-4 py-1 w-full focus:outline-none"
                value={lastName || ""}
                name="lname"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="w-full">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email || ""}
                className="bg-[var(--secondary-background)] rounded mt-5 px-4 py-1 w-full focus:outline-none"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Subject"
                className="bg-[var(--secondary-background)] rounded mt-5 px-4 py-1 w-full focus:outline-none"
                value={esubject}
                onChange={(e) => setEsubject(e.target.value)}
                name="subject"
              />
            </div>
            <textarea
              name="message"
              placeholder="Your Message"
              className="bg-[var(--secondary-background)] rounded my-5 px-4 py-1 w-full h-[120px] focus:outline-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <div className="w-full flex justify-center mb-5">
              <Button name="Send Message" type="submit" />
            </div>
          </form>
        </section>
        {/* Footer */}
        <footer className="bg-[var(--secondary-background)] py-5">
          <div className="container mx-auto text-center">
            <p>Copyright &copy; 2025 Yashkaran Singh. All rights reserved.</p>
          </div>
        </footer>
        {/* Theme button */}
        <section className="">
          {theme ? (
            <button
              className="bg-[var(--primary-accent)] fixed right-3 bottom-3 h-14 w-14 rounded-full flex justify-center items-center text-2xl font-bold cursor-pointer"
              onClick={() => setTheme(!theme)}
            >
              <FaSun className="text-white" />
            </button>
          ) : (
            <button
              className="fixed right-3 bottom-3 h-14 w-14 rounded-full flex justify-center items-center text-2xl font-bold bg-[var(--primary-accent)] cursor-pointer"
              onClick={() => setTheme(!theme)}
            >
              <FaMoon className="text-white " />
            </button>
          )}
        </section>
      </div>
    </>
  );
}

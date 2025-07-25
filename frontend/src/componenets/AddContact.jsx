import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "../componenets/Button";

export default function AddContact() {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");
  const [image, setImage] = React.useState("");
  const [contactCreate, setContactCreate] = React.useState(false)

  const Backend_url = import.meta.env.VITE_BACKEND_URL

  const navigate = useNavigate();
  const token = localStorage.getItem("aToken");

  const adminVerify = () => {
    if (!token) {
      navigate("/settings");
    }
  };

  React.useEffect(() => {
    adminVerify();
  }, []);

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(file);
    };
  };

  const handleCreateContact = async (e) => {
    e.preventDefault();
    setContactCreate(true)
    const formData = new FormData();
    formData.append("name", name);
    formData.append("link", link);
    formData.append("image", image);
    try {
      if(!name || !link || !image){
        Swal.fire({
        position: "center",
        title: "All fields are required",
        showConfirmButton: false,
        timer: 2000,
      });
      return
      }
       await axios.post(
        `${Backend_url}data/create/contact`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Project create successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      setImage("");
      setName("");
      setLink("");
      setContactCreate(false)
      navigate("/settings");
    } catch (error) {
      console.log("error while create course", error);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center px-4 py-8 bg-gray-200/60">
      <div className="w-full max-w-3xl bg-[var(--light-background)] rounded-xl shadow-xl">
        <div className="bg-white p-6 rounded-t-xl">
          <h2 className="font-semibold text-3xl text-[var(--heading-border)]">
            New Contact
          </h2>
          <h3 className="text-xl mt-1">Enter contact information</h3>
        </div>

        <form
          onSubmit={handleCreateContact}
          className="w-full px-6 py-4 space-y-4"
        >
          {/* Project Name */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
            <label className="md:w-2/5 font-semibold">
              Name of your Contact
            </label>
            <input
              type="text"
              placeholder="Name of your project"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white rounded-lg px-4 py-2 focus:outline-none"
            />
          </div>

          {/* Image Upload */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
            <label className="md:w-2/5 font-semibold">Upload image</label>
            <input
              type="file"
              onChange={changePhotoHandler}
              className="w-full bg-white rounded-lg px-4 py-2 focus:outline-none"
            />
          </div>

          {/* Repo Link */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
            <label className="md:w-2/5 font-semibold">Repository link</label>
            <input
              type="text"
              placeholder="Enter project link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full bg-white rounded-lg px-4 py-2 focus:outline-none"
            />
          </div>

          {/* Buttons */}
          {
            contactCreate ?
            <div className="flex justify-center items-center gap-4 pt-4">
              <Button name="Loading..." />
            </div>:
            <div className="flex justify-center items-center gap-4 pt-4">
            <Link
              to="/settings"
              className="px-4 py-2 text-[var(--heading-border)] bg-white border-2 rounded-full border-[var(--heading-border)] font-semibold hover:text-white hover:bg-[var(--heading-border)] transition hover:border-2 hover:border-white"
            >
              Cancel
            </Link>
            <Button name="Create" type="submit" onClick={handleCreateContact} />
          </div>
          }
          
        </form>
      </div>
    </div>
  );
}

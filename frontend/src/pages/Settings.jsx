/* eslint-disable no-unused-vars */
import React from "react";
import SideBar from "../componenets/SideBar";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "../componenets/Button";

export default function Settings() {
  const [contact, setContact] = React.useState([]);
  const [services, setServices] = React.useState([]);
  const [editingId, setEditingId] = React.useState(null);
  const [editedContact, setEditedContact] = React.useState("");
  const [aimg, setAimg] = React.useState([]);
  const [createImg, setCreateImg] = React.useState(false);
  const [createSkill, setCreateSkill] = React.useState(false);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [link, setLink] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [fileCv, setFileCv] = React.useState(null);
  const [addButton, setAddButton] = React.useState(false);

  const token = localStorage.getItem("aToken");
  const Backend_url = import.meta.env.VITE_BACKEND_URL;

  const getContact = async () => {
    try {
      const response = await axios.get(`${Backend_url}data/contact`, {
        withCredentials: true,
      });
      setContact(response.data);
    } catch (error) {
      Swal.fire("Error", "Failed to delete contact", "error");
    }
  };

  const deleteContactHandler = async (contactId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`${Backend_url}data/delete/contact/${contactId}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        Swal.fire("Deleted!", "Your contact has been deleted.", "success");
        getContact(); // refresh
      } catch (err) {
        Swal.fire("Error", "Failed to delete contact", "error");
      }
    }
  };

  const saveEditedContact = async (contactId) => {
    try {
      await axios.put(
        `${Backend_url}data/update/contact/${contactId}`,
        { link: editedContact },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      Swal.fire("Updated!", "Contact has been updated.", "success");
      setEditingId(null);
      setEditedContact("");
      getContact();
    } catch (error) {
      Swal.fire("Error", "Failed to update contact", "error");
    }
  };

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleCreateImage = async (e) => {
    e.preventDefault();
    setAddButton(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    try {
      const response = await axios.post(
        `${Backend_url}data/create/img`,
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
        title: "Project updated successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      setName("");
      setImage(null);
      await getImg();
      setCreateImg(false);
      setAddButton(false);
    } catch (error) {
      setCreateImg(false);
      Swal.fire("Error", "Failed to get image", "error");
    }
  };

  const getImg = async () => {
    try {
      const res = await axios.get(`${Backend_url}data/image`);
      if (res) {
        setAimg(res.data);
      }
    } catch (error) {
      Swal.fire("Error", "Failed to get image", "error");
    }
  };

  const handleDeleteImage = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (confirm.isConfirmed) {
      try {
        await axios.delete(`${Backend_url}data/delete/img/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        Swal.fire("Deleted!", "Image has been deleted.", "success");
        getImg();
      } catch (error) {
        Swal.fire("Error", "Failed to get image", "error");
      }
    }
  };

  const handleCreateSkill = async (e) => {
    e.preventDefault();
    setAddButton(true);
    if (!name || !description || !link) {
      Swal.fire({
        position: "center",
        title: "Fill all detail to create new skill",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
    const formData = { name, description, link };
    try {
      const response = await axios.post(
        `${Backend_url}data/create/service`,
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
        title: "Project updated successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      setName("");
      setDescription("");
      setLink("");
      await getSkill();
      setCreateSkill(false);
      setAddButton(false);
    } catch (error) {
      setCreateSkill(false);
      setAddButton(false);
      Swal.fire("Error", "Failed to add new skill", "error");
    }
  };

  const getSkill = async () => {
    try {
      const res = await axios.get(`${Backend_url}data/service`);
      if (res) {
        setServices(res.data);
      }
    } catch (error) {
      Swal.fire("Error", "Failed to get image", "error");
    }
  };

  const handleDeleteSkill = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (confirm.isConfirmed) {
      try {
        await axios.delete(`${Backend_url}data/delete/service/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        Swal.fire("Deleted!", "Service has been deleted.", "success");
        getSkill();
      } catch (error) {
        Swal.fire("Error", "Failed to get image", "error");
      }
    }
  };

  const handleCvUpload = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("pdf", fileCv);
      const response = await axios.post(
        `${Backend_url}data/upload-pdf`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      Swal.fire("Success", "CV uploaded successfully", "success");
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Failed to upload CV", "error");
    }
  };

  React.useEffect(() => {
    getContact(), getImg(), getSkill();
  }, []);

  return (
    <div className="flex">
      <SideBar />
      <div className="mt-15 lg:mt-0 ml-0 lg:ml-64 w-full min-h-screen p-6 bg-[var(--secondary-background)]">
        <h1 className="text-4xl font-bold text-[var(--primary-accent)] mb-6 border-b pb-4 text-center border-[var(--color-text)]">
          Settings
        </h1>

        {/* Contact section */}
        <section className="border-b pb-10 border-[var(--color-text)]">
          <div className="flex justify-between mx-5">
            <h2 className="text-[var(--primary-accent)] text-4xl underline font-semibold my-5">
              Contact
            </h2>
            <Link
              to="/addcontact"
              className="flex items-center font-semibold text-white bg-blue-500 hover:bg-blue-600 hover:cursor-pointer px-4 my-4 rounded-md"
            >
              Add Contact
            </Link>
          </div>

          {contact.map((data) => {
            const { _id, name, link } = data;
            const isEditing = editingId === _id;

            return (
              <div key={_id} className="flex gap-2 md:gap-5 mt-5 items-center">
                {isEditing ? (
                  <>
                    <p className="text-semibold text-xl w-[8rem] text-[var(--primary-accent)]">
                      {name}:
                    </p>
                    <input
                      type="text"
                      value={editedContact}
                      onChange={(e) => setEditedContact(e.target.value)}
                      className="w-[30%] px-4 py-2 border border-gray-500 rounded-md bg-white"
                    />
                    <button
                      className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 hover:cursor-pointer"
                      onClick={() => saveEditedContact(_id)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 hover:cursor-pointer"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-semibold text-xl w-[8rem] text-[var(--primary-accent)]">
                      {name}:
                    </p>
                    <p className="w-[30%] border flex items-center rounded-md px-4 py-2 bg-white overflow-hidden">
                      {link}
                    </p>
                    <button
                      className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 hover:cursor-pointer"
                      onClick={() => {
                        setEditingId(_id);
                        setEditedContact(link);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 hover:cursor-pointer"
                      onClick={() => deleteContactHandler(_id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </section>

        {/* Image section */}
        <section className="border-b pb-10 border-[var(--color-text)] ">
          <div className="my-4 text-3xl text-[var(--primary-accent)] underline font-semibold">
            Images
          </div>
          <div className="flex flex-wrap justify-center items-center gap-10">
            {aimg.map((data) => {
              const { _id, name, image } = data;
              return (
                <div
                  key={_id}
                  className="bg-white text-[var(--color-text)] w-[12rem] rounded-xl flex flex-col justify-center items-center pb-4"
                >
                  <p className="h-[18rem]">
                    <img
                      src={image.url}
                      alt=""
                      className="rounded-t-xl h-full w-full"
                    />
                  </p>
                  <p className="text-center font-semibold my-2 text-black">
                    {name}
                  </p>
                  <button
                    className="py-2 px-4 bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white rounded-md"
                    onClick={() => handleDeleteImage(_id)}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => setCreateImg(true)}
            className="py-2 px-6 rounded-full bg-[var(--secondary-accent)] text-white font-semibold shadow-md hover:bg-[var(--hover-button)] hover:scale-[1.02] transition duration-300 ease-in-out hover:cursor-pointer mt-4"
          >
            Create Image
          </button>

          {createImg && (
            <div
              className="inset-0 fixed flex bg-transparent backdrop-blur-[20px] justify-center items-center"
              onClick={() => {
                setCreateImg(false), setAddButton(false);
              }}
            >
              <div
                className="bg-[var(--color-background)] text-[var(--color-text)] p-6 rounded-xl w-[90%] md:w-[60%] lg:w-[50%] 2xl:w-[40%] border-2"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-2xl font-semibold text-center mb-4">
                  Add new Image
                </h2>
                <form onSubmit={handleCreateImage} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full border px-4 py-2 rounded outline-none"
                  />
                  <input
                    type="file"
                    onChange={changePhotoHandler}
                    required
                    className="w-full border px-4 py-2 rounded outline-none"
                  />
                  {addButton ? (
                    <div className="flex justify-center items-center gap-4 pt-4">
                      <Button name="Loading..." />
                    </div>
                  ) : (
                    <div className="flex justify-center items-center gap-4 pt-4">
                      <button
                        className="px-4 py-2 text-[var(--primary-accent)] bg-white border-2 rounded-full border-[var(--primary-accent)] font-semibold hover:text-white hover:bg-[var(--primary-accent)] transition hover:border-2 hover:border-white"
                        onClick={() => {
                          setCreateImg(false);
                        }}
                      >
                        Cancel
                      </button>
                      <Button
                        name="Update"
                        type="submit"
                        url={handleCreateImage}
                      />
                    </div>
                  )}
                </form>
              </div>
            </div>
          )}
        </section>

        {/* skill section */}
        <section className="border-b pb-10 border-[var(--color-text)]">
          <h2 className="my-4 text-3xl text-[var(--primary-accent)] underline font-semibold">
            Skills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((data) => {
              const { _id, name, description, link } = data;
              return (
                <div
                  key={_id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col justify-between h-full"
                >
                  <div>
                    <h3 className="text-xl font-bold text-[var(--primary-accent)]">
                      {name}
                    </h3>
                    <p className="text-gray-600 mt-2 line-clamp-3">
                      {description}
                    </p>
                  </div>
                  <div className="mt-4 w-full text-center space-x-5">
                    <a
                      href={link}
                      target="_blank"
                      className="inline-block px-4 py-2 bg-[var(--primary-accent)] text-white rounded-md hover:bg-[var(--secondary-accent)] transition"
                    >
                      Visit
                    </a>
                    <button
                      className="py-2 px-4 bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white rounded-md"
                      onClick={() => handleDeleteSkill(_id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            onClick={() => setCreateSkill(true)}
            className="py-2 px-6 rounded-full bg-[var(--secondary-accent)] text-white font-semibold shadow-md hover:bg-[var(--hover-button)] hover:scale-[1.02] transition duration-300 ease-in-out hover:cursor-pointer mt-6"
          >
            Add new skill
          </button>
          {createSkill && (
            <div
              className="inset-0 fixed flex bg-transparent backdrop-blur-[20px] justify-center items-center"
              onClick={() => {
                setCreateSkill(false), setAddButton(false);
              }}
            >
              <div
                className="bg-[var(--color-background)] text-[var(--color-text)] p-6 rounded-xl w-[90%] md:w-[60%] lg:w-[50%] 2xl:w-[40%] border-2"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-2xl font-semibold text-center mb-4">
                  Add new Image
                </h2>
                <form onSubmit={handleCreateSkill} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Skill Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full border px-4 py-2 rounded outline-none"
                  />
                  <textarea
                    name=""
                    id=""
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border px-4 py-2 rounded outline-none"
                  ></textarea>
                  <input
                    type="text"
                    placeholder="Link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    required
                    className="w-full border px-4 py-2 rounded outline-none"
                  />
                  {addButton ? (
                    <div className="flex justify-center items-center gap-4 pt-4">
                      <Button name="Loading..." />
                    </div>
                  ) : (
                    <div className="flex justify-center items-center gap-4 pt-4">
                      <button
                        className="px-4 py-2 text-[var(--primary-accent)] bg-white border-2 rounded-full border-[var(--primary-accent)] font-semibold hover:text-white hover:bg-[var(--primary-accent)] transition hover:border-2 hover:border-white"
                        onClick={() => {
                          setCreateSkill(false);
                        }}
                      >
                        Cancel
                      </button>
                      <Button
                        name="Update"
                        type="submit"
                        url={handleCreateSkill}
                      />
                    </div>
                  )}
                </form>
              </div>
            </div>
          )}
        </section>

        {/* CV section */}
        <section className="py-16 border-b border-[var(--color-text)]">
          <div className="max-w-4xl mx-auto text-center">
            {/* Section Title */}
            <h2 className="text-4xl font-bold text-[var(--primary-accent)] mb-3">
              Upload Your CV
            </h2>
            <p className="text-lg text-[var(--color-text-muted)] mb-10">
              Upload your latest CV and preview it instantly.
            </p>

            <div className="grid gap-10 md:grid-cols-2">
              {/* Upload Form */}
              <form
                onSubmit={handleCvUpload}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <label className="block text-lg font-semibold text-[var(--primary-accent)] mb-4">
                    Select CV File
                  </label>

                  <input
                    type="file"
                    name="cv"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setFileCv(e.target.files[0])}
                    className="w-full border border-gray-300 px-4 py-3 rounded-lg text-gray-700 
              file:mr-4 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm 
              file:font-semibold file:bg-[var(--primary-accent)] file:text-white 
              hover:file:bg-[var(--secondary-accent)] cursor-pointer"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-6 py-3 px-6 rounded-full bg-[var(--secondary-accent)] text-white font-semibold 
            shadow-md hover:bg-[var(--hover-button)] hover:scale-[1.02] transition-all duration-300 hover:cursor-pointer"
                >
                  Upload CV
                </button>
              </form>

              {/* Preview / Open CV */}
              <div className="bg-[var(--secondary-background)] text-white p-8 rounded-2xl shadow-lg flex flex-col items-center justify-center">
                <h3 className="text-2xl font-semibold mb-4">Preview CV</h3>
                <p className="text-[var(--color-text-muted)] text-sm mb-6">
                  Open your uploaded CV in a new tab.
                </p>

                <button
                  onClick={() =>
                    window.open(`${Backend_url}data/get-pdf`, "_blank")
                  }
                  className="py-3 px-8 rounded-full bg-[var(--primary-accent)] text-white font-semibold 
            shadow-md hover:bg-[var(--secondary-accent)] hover:scale-[1.05] transition-all duration-300 hover:cursor-pointer"
                >
                  Open CV
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

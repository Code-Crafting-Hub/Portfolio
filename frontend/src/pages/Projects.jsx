/* eslint-disable no-unused-vars */
import React from "react";
import SideBar from "../componenets/SideBar";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "../componenets/Button";
import Swal from "sweetalert2";

export default function Projects() {
  const [projectData, setProjectData] = React.useState([]);
  const [projectUpdate, setProjectUpdate] = React.useState(false)
  const [editData, setEditData] = React.useState(false);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [link, setLink] = React.useState("");
  const [image, setImageFile] = React.useState(null);
  const [id, setId] = React.useState("");
  const token = localStorage.getItem("aToken");

  const Backend_url = import.meta.env.VITE_BACKEND_URL

  const getData = async () => {
    try {
      const response = await axios.get(
        `${Backend_url}data/projects`,
        {
          withCredentials: true,
        }
      );
      if (!response) {
        console.log("response not received");
      }
      setProjectData(response.data);
    } catch (error) {
      console.log("error in fetching project data", error);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  const handleEditData = (data) => {
    setName(data.name);
    setLink(data.link);
    setDescription(data.description);
    setId(data._id);
    setEditData(true);
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    setProjectUpdate(true)
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("link", link);
    if (image) {
      formData.append("image", image);
    }
    try {
      const response = await axios.put(
        `${Backend_url}data/update/${id}`,
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
      setDescription("");
      setImageFile("");
      setName("");
      setLink("");
      setId("");
      setProjectUpdate(false)
      await getData();
      setEditData(false);
    } catch (error) {
      console.log("error while create course", error);
    }
  };

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleDeleteProject = async (projectId) => {
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
        await axios.delete(
          `${Backend_url}data/delete/${projectId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        Swal.fire("Deleted!", "Your project has been deleted.", "success");
        getData();
      } catch (err) {
        Swal.fire("Error", "Failed to delete project", "error");
      }
    }
  };

  return (
    <div className="flex">
      <SideBar />

      <div className="mt-15 md:mt-0 ml-0 lg:ml-64 w-full min-h-screen p-6 bg-[var(--secondary-background)]">
        <h1 className="text-4xl font-bold text-[var(--primary-accent)] mb-6 border-b pb-4 text-center">
          Projects
        </h1>

        <section className="flex flex-wrap w-full gap-6 p-5 lg:p-[3rem] justify-center items-center">
          {projectData.length > 0 ? (
            projectData.map((data) => {
              const { _id, name, description, link, image } = data;
              return (
                <div
                  key={_id}
                  className="bg-white gap-5 shadow-md rounded-2xl p-6 hover:shadow-lg transition-all w-[23rem]"
                >
                  <div className="flex">
                    <div className="w-[50%]">
                      <h2 className="text-2xl font-semibold text-[var(--primary-accent)] mb-2">
                        {name}
                      </h2>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {description}
                      </p>
                    </div>
                    <div className="w-[50%] h-[6.3rem] rounded-xl overflow-ellipsis right-2">
                      <img
                        src={image.url}
                        alt=""
                        className="w-full h-full rounded"
                      />
                    </div>
                  </div>
                  <div className="flex gap-5 mt-2 justify-center items-center">
                    <a
                      href={link}
                      target="_blank"
                      className="inline-block text-white bg-[var(--primary-accent)] px-4 py-2 rounded-md hover:bg-[var(--secondary-accent)] text-sm transition"
                    >
                      View Project
                    </a>
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                      onClick={() => {
                        handleEditData(data);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProject(_id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 col-span-full">No projects found.</p>
          )}
        </section>
        <Link
          to="/create"
          className="fixed bottom-6 right-6 text-3xl bg-[var(--primary-accent)] text-white rounded-full w-[50px] h-[50px] hover:bg-purple-600 hover:cursor-pointer flex justify-center items-center"
        >
          +
        </Link>
      </div>
      {editData && (
        <div
          className="mt-18 md:mt-0 inset-0 fixed flex bg-white bg-opacity-50 justify-center items-center"
          onClick={() => {
            setEditData(null);
          }}
        >
          <div
            className="h-screen md:h-auto md:w-[90%] lg:w-[80%] xl:w-[70%] 2xl:w-[60%] bg-[var(--color-background)] rounded-xl"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="bg-white p-6 rounded-t-xl">
              <h2 className="font-semibold text-3xl text-[var(--primary-accent)]">
                New Project
              </h2>
              <h3 className="text-xl mt-1">Enter project information</h3>
            </div>

            <form
              onSubmit={handleUpdateProject}
              className="w-full px-6 py-4 space-y-4"
            >
              {/* Project Name */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                <label className="md:w-2/5 font-semibold">
                  Name of your project
                </label>
                <input
                  type="text"
                  placeholder="Name of your project"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white rounded-lg px-4 py-2 focus:outline-none"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col md:flex-row items-start md:items-start gap-2">
                <label className="md:w-2/5 font-semibold">Description</label>
                <textarea
                  placeholder="Describe your project in some words"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-white rounded-lg px-4 py-2 focus:outline-none resize-none"
                ></textarea>
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
                <label className="md:w-2/5 font-semibold">
                  Repository link
                </label>
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
                projectUpdate ?
                <div className="flex justify-center items-center gap-4 pt-4">
                  <Button name="Loading..." />
                </div>:
                <div className="flex justify-center items-center gap-4 pt-4">
                <button
                  className="px-4 py-2 text-[var(--primary-accent)] bg-white border-2 rounded-full border-[var(--primary-accent)] font-semibold hover:text-white hover:bg-[var(--primary-accent)] transition hover:border-2 hover:border-white"
                  onClick={() => {
                    setEditData(false);
                  }}
                >
                  Cancel
                </button>
                <Button
                  name="Update"
                  type="submit"
                  onClick={handleUpdateProject}
                />
              </div>
              }
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

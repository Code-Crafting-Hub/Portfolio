import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../componenets/SideBar";

export default function Users() {
  const navigate = useNavigate();
  const token = localStorage.getItem("aToken");
  const [userDetails, setDetails] = React.useState([]);

  const Backend_url = import.meta.env.VITE_BACKEND_URL

  const adminVerify = async () => {
    if (!token) {
      navigate("/");
    }
  };

  const userData = async () => {
    try {
      if (token) {
        const response = await axios.get(
          `${Backend_url}data/userData`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDetails(response.data);
      }
    } catch (error) {
      console.log("Error user data",error);
    }
  };

  React.useEffect(() => {
    adminVerify();
    userData();
  }, [ ]);

  return (
    <div className="flex">
      <SideBar/>

      <div className="lg:ml-64 w-full bg-[var(--secondary-background)] min-h-screen">
        <h2 className="text-4xl text-center font-bold mt-8 lg:mt-0 p-[3rem] text-[var(--primary-accent)]">
          User details
        </h2>

        <section className="flex flex-wrap w-full gap-6 p-5 lg:p-[3rem] justify-center items-center">
          {userDetails.map((user) => {
            const { _id, firstName, lastName, phoneNo, email } = user;
            return (
              <div
                key={_id}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 w-[23rem] mx-auto md:mx-0"
              >
                <h2 className="text-xl font-semibold text-[var(--primary-accent)] mb-2">
                  {firstName} {lastName}
                </h2>
                <p className="text-gray-700">
                  <span className="font-medium">Phone:</span> {phoneNo}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Email:</span> {email}
                </p>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}

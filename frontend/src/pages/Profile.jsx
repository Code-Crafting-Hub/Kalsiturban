import React, { useEffect, useState } from "react";
import Logo from "../components/Logo";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [newProfile, setNewProfile] = useState();
  const [popUp, setPopUp] = useState(false);

  const navigate = useNavigate();

  const gettingData = async () => {
    try {
      const detail = await axios.get(`${backendURL}/users/detail`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { firstName, lastName, phoneNumber, image, address } = detail.data;
      setFirstName(firstName);
      setLastName(lastName);
      setPhoneNumber(phoneNumber);
      setAddress(address);
      setImageUrl(image.url);
    } catch (error) {
      console.log(error);
    }
  };

  const changeImageHandler = async (e) => {
    e.preventDefault();
    console.log(newProfile);
    try {
      const profile = new FormData();
      profile.append("image", newProfile);
      console.log(profile);
      const response = await axios.post(
        `${backendURL}/users/profile/image`,
        profile,
        {
          withCredentials: true,
        },
      );
      console.log(response);
      if (response.status === 200) {
        toast.success(response.data.message);
        const { firstName, image } = response.data.updatedUser;
        localStorage.setItem(
          "user",
          JSON.stringify({ firstName, image: image.url }),
        );
        setTimeout(() => {
          navigate(0);
        }, 1500);
      }
    } catch (error) {
      const err = error.response;
      if (err.errors) {
        toast.error(`${err.errors}`);
      } else {
        toast.error(`${err.message}`);
      }
      console.log(error);
    }
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    try {
      if (password !== confPassword) {
        return toast.error("Password not match");
      }
      if (!firstName || !lastName || !address || !phoneNumber || !password) {
        return toast.error("Please fill all the fields");
      }
      const data = {
        firstName,
        lastName,
        password,
        address,
        phoneNumber,
      };
      const response = await axios.post(`${backendURL}/users/profile/update`,data,{
        withCredentials:true,
      });
      console.log(response.data)
      if(response.status === 200){
        toast.success(`${response.data.message}`)
        const { firstName, image } = response.data.updatedUser;
        localStorage.setItem(
          "user",
          JSON.stringify({ firstName, image: image.url }),
        );
        setTimeout(()=>{
          navigate(0);
        },1500)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.message);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    gettingData();
  }, []);

  return (
    <>
      <Logo />
      <Navbar />
      <Toaster />

      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
        <div className="bg-white shadow-xl rounded-2xl w-full max-w-4xl p-8 flex flex-col md:flex-row gap-10">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center md:w-1/3">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-blue-500">
              <img src={imageUrl} alt="Profile" className="w-full h-full" />
            </div>
            <button
              className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition cursor-pointer"
              onClick={() => setPopUp(!popUp)}
            >
              Change Photo
            </button>
          </div>

          {/* Form Section */}
          <div className="md:w-2/3">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">
              Edit Profile
            </h2>

            <form className="space-y-5" onSubmit={updateProfileHandler}>
              {/* First Name */}
              <div>
                <label className="block text-gray-600 mb-1">First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-gray-600 mb-1">Last Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-gray-600 mb-1">Address</label>
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-600 mb-1">Phone</label>
                <input
                  type="tel"
                  placeholder="Phone"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                />
              </div>

              {/* Change Password */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="New Password"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={confPassword}
                    onChange={(e) => {
                      setConfPassword(e.target.value);
                    }}
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition duration-300 shadow-md cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {popUp && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm"
          onClick={() => {
            setPopUp(!popUp);
          }}
        >
          <div
            className="w-full max-w-md p-6 mx-4 bg-white rounded-xl shadow-2xl transform transition-all"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Update Profile Picture
            </h3>

            <form onSubmit={changeImageHandler} className="space-y-4">
              <input
                type="file"
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                onChange={(e) => {
                  setNewProfile(e.target.files[0]);
                }}
              />

              <div className="flex items-center justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setPopUp(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md shadow-blue-200 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

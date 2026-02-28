import React from 'react'
import Logo from '../components/Logo'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Profile() {
  return (
    <>
      <Logo />
      <Navbar />

      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
        <div className="bg-white shadow-xl rounded-2xl w-full max-w-4xl p-8 flex flex-col md:flex-row gap-10">

          {/* Profile Image Section */}
          <div className="flex flex-col items-center md:w-1/3">
            <div className="w-40 h-40 rounded-full overflow-hidden shadow-md border-4 border-blue-500">
              <img
                src="https://via.placeholder.com/150"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition cursor-pointer">
              Change Photo
            </button>
          </div>

          {/* Form Section */}
          <div className="md:w-2/3">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">
              Edit Profile
            </h2>

            <form className="space-y-5">

              {/* First Name */}
              <div>
                <label className="block text-gray-600 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-gray-600 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-gray-600 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-600 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="Phone"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
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

      <Footer />
    </>
  )
}
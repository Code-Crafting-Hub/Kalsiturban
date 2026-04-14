import React, { useEffect, useState } from "react";
import Logo from "../components/Logo";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Orders() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const handleBookingDetail = async () => {
    try {
      const response = await axios.get(`${backendURL}/booking/order`, {
        withCredentials: true,
      });
      setBookings(response.data);
    } catch (error) {
      console.log("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id) => {
    try {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: true,
      });
      swalWithBootstrapButtons
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, cancel it!",
          cancelButtonText: "Back",
          confirmButtonColor: "#fc030b",
          cancelButtonColor: "#089603",
          reverseButtons: true,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            try {
              const response = await axios.get(
                `${backendURL}/booking/cancel/${id}`,
                {
                  withCredentials: true,
                },
              );
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: `${response.data.message}`,
                icon: "success",
                showConfirmButton: false,
                timer: 1000,
              });
              handleBookingDetail();
            } catch (error) {
              console.log("Error in cancelling booking", error);
            }
          } else if (result.dismiss === Swal.DismissReason.cancel)
            swalWithBootstrapButtons.fire({
              title: "Cancelled",
              text: "Your imaginary file is safe :)",
              icon: "error",
              showConfirmButton: false,
              timer: 1000,
            });
        });
    } catch (error) {
      console.log("Error in cancelling booking", error);
    }
  };

  useEffect(() => {
    handleBookingDetail();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Logo />
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 border-l-4 border-orange-500 pl-4">
            My Bookings
          </h1>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
          ) : bookings.length > 0 ? (
            <div className="grid gap-6">
              {bookings.map((booking) => (
                <div key={booking._id} className="flex flex-col md:flex-row">
                  <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row">
                      {/* Status Side Bar */}
                      <div className="bg-orange-500 md:w-2 flex items-center justify-center"></div>

                      <div className="p-6 flex-grow">
                        <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                          <div>
                            <h2 className="text-xl font-bold text-gray-800">
                              {booking.bookingDetail.purpose}
                            </h2>
                            <p className="text-sm text-gray-500">
                              Booking ID: {booking._id}
                            </p>
                          </div>
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-bold uppercase tracking-wider">
                            {booking.bookingDetail.status}
                        </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-gray-50 pt-4">
                          <div className="space-y-1">
                            <p className="text-xs text-gray-400 uppercase font-semibold">
                              Scheduled For
                            </p>
                            <p className="text-gray-700 flex items-center gap-2">
                              <span className="text-orange-500">From</span>{" "}
                              {booking.bookingDetail.from}
                            </p>
                            <p className="text-gray-700 flex items-center gap-2">
                              <span className="text-orange-500">To</span>{" "}
                              {booking.bookingDetail.to}
                            </p>
                          </div>

                          <div className="space-y-1">
                            <p className="text-xs text-gray-400 uppercase font-semibold">
                              Contact Person
                            </p>
                            <p className="text-gray-700">
                              {booking.bookingDetail.firstName}{" "}
                              {booking.bookingDetail.lastName}
                            </p>
                            <p className="text-xs text-gray-500">
                              {booking.bookingDetail.phoneNumber}
                            </p>
                          </div>

                          <div className="space-y-1">
                            <p className="text-xs text-gray-400 uppercase font-semibold">
                              Location
                            </p>
                            <p className="text-gray-700 truncate">
                              {booking.bookingDetail.address}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-6 flex flex-col justify-center border-t md:border-t-0 md:border-l border-gray-100 min-w-[150px]">
                        <p className="text-xs text-center text-gray-400 mb-2">
                          Booked On
                        </p>
                        <p className="text-center font-medium text-gray-800">
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    className="py-2 px-4 text-sm mx-2 my-4 md:py-3 md:px-6 md:text-base md:mx-4 md:my-auto bg-orange-500 text-white hover:bg-orange-600 rounded-xl transition-colors hover:cursor-pointer"
                    onClick={() => {
                      cancelBooking(booking._id);
                    }}
                  >
                    Cancel Booking
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-dashed border-gray-300">
              <div className="text-6xl mb-4 text-gray-300">Empty</div>
              <h2 className="text-xl font-semibold text-gray-600">
                No bookings found
              </h2>
              <p className="text-gray-400 mt-2 mb-6">
                You haven't scheduled any services yet.
              </p>
              <Link
                to="/booking"
                className="mt-6 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition cursor-pointer"
              >
                Book a Service
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

import React from "react";
import Navbar from "../components/Navbar";
import Logo from "../components/Logo";
import Footer from "../components/Footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img from "../assets/first.jpeg";
import img2 from "../assets/second.jpeg";
import img3 from "../assets/third.jpeg";
import img4 from "../assets/seventh.jpeg";
import img5 from "../assets/fifth.jpg";
import img6 from "../assets/eighth.jpeg";
import img7 from "../assets/ninth.jpeg"
import About1 from "../components/About1";
import Booking from "../components/Booking1";

export default function Home() {
  const Image = [
    {
      id: "1",
      url: img,
    },
    {
      id: "2",
      url: img2,
    },
    {
      id: "3",
      url: img3,
    },
    {
      id: "4",
      url: img4,
    },
    {
      id: "5",
      url: img5,
    },
    {
      id: "6",
      url: img6,
    },
    {
      id: "7",
      url: img7,
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024, // tablets
        settings: {
          arrows: true,
        },
      },
      {
        breakpoint: 768, // small tablets
        settings: {
          arrows: true,
        },
      },
      {
        breakpoint: 480, // mobile
        
        settings: {
          arrows: true,
          slidesToShow: 1,
          dots: true,
        },
      },
    ],
  };

  return (
    <>
      {/* Top bar */}
      <Logo />
      <Navbar />
      {/* Slide show of images */}
      <div className="w-full overflow-hidden">
        <Slider {...settings}>
          {Image.map((images) => (
            <div key={images.id}>
              <img
                src={images.url}
                alt=""
                className="w-full h-50 sm:h-75 md:h-100 lg:h-125 object-cover no-border-on-click"
              />
            </div>
          ))}
        </Slider>
      </div>

      <About1/>
      <Booking/>

      {/* Footer */}
      <Footer />
    </>
  );
}

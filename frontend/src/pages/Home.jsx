import React from "react";
import Navbar from "../components/Navbar";
import Logo from "../components/Logo";
import Footer from "../components/Footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img from "../assets/images.jpeg";
import img2 from "../assets/images (1).jpeg";
import img3 from "../assets/images (2).jpeg";
import img4 from "../assets/download (2).jpeg";
import img5 from "../assets/download (1).jpeg";
import img6 from "../assets/download.jpeg";

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
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024, // tablets
        settings: {
          arrows: false,
        },
      },
      {
        breakpoint: 768, // small tablets
        settings: {
          arrows: false,
        },
      },
      {
        breakpoint: 480, // mobile
        settings: {
          arrows: false,
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
                className="w-full h-50 sm:h-75 md:h-100 lg:h-125 object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}

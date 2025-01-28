import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Mousewheel, Keyboard } from "swiper";
// Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const slideImages = [
  {
    src: "https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/6/27/1b39ae61-c690-4b92-b3ec-21f337ca9e851656324904938-Roadster_Desk_Banner.jpg",
    link: "/roadster",
    state: {
      brand: "roadster",
      sort: "discount",
    },
  },
  {
    src: "https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/6/26/3e7afd9a-712b-43c0-8514-a13954c7033b1656221544190-Casual-Wear_Desk.jpg",
    link: "/casual-wear",
    state: { q: "casual", sort: "discount" },
  },
  {
    src: "https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/6/1/7b1da839-34a4-4e78-b5b5-e18af304e3bd1654099311017-Top-Kurta-Sets_Desk.jpg",
    link: "top-kurtas",
    state: { q: "kurta", sort: "discount" },
  },
  {
    src: "https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/6/1/9041bdba-b48a-4ed9-8fcb-e1eeb23a74e31654099110315-Sports---Casual-Shoes_Desk.jpg",
    link: "/casual-shoes",
    state: { category: "casual shoes", sort: "discount" },
  },
  {
    src: "https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/6/1/553384ff-be1f-4272-81d6-6f9e43fe5fe51654097949853-Dresses_Desk.jpg",
    link: "/dresses",
    state: { category: "dresses", gender: "Women", sort: "discount" },
  },
  {
    src: "https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/31/4031994d-9092-4aa7-aea1-f52f2ae5194f1654006594976-Activewear_DK.jpg",
    link: "/active-wear",
    state: { q: "active" },
  },
  {
    src: "https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/6/26/d3745533-9b5e-4c4b-81cb-dd60be8639381656221544161-Modern-Sarees_Desk.jpg",
    link: "/modren-sarees",
    state: { q: "saree", sort: "discount" },
  },
  {
    src: "https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/7/4/a3e5a2ce-a080-47a0-9e9a-0f317ed845f11656945857216-Biba_Desk_Banner.jpg",
    link: "/biba",
    state: {
      brand: "Biba",
    },
  },
];

const HomeSlider = () => {
  return (
    <div className="slider-container">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        mousewheel={true}
        keyboard={true}
        modules={[Autoplay, Pagination, Mousewheel, Keyboard]}
      >
        {slideImages.map((slideImage, key) => (
          <SwiperSlide key={key}>
            <Link to={slideImage.link} state={slideImage.state}>
              <img src={slideImage.src} width="100%" alt={`${key}th slide`} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeSlider;

import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeProductCard from "../Product/HomeProductCard";
import axios from "../../axiosConfig";
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const ProductSlider = (props) => {
  const { title, url, productUrl, similar_products } = props;
  const [products, setProducts] = useState([]);

  const btnSeeAll = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(productUrl);
        setProducts(data.products);
      } catch (err) {
        // console.error(err);
      }
    };

    if (similar_products) {
      setProducts(similar_products);
    } else {
      fetchProducts();
    }
  }, [productUrl, similar_products]);

  return products.length > 0 ? (
    <div className="home-sub-container">
      <div>
        <h2 className="home-sub-container-title">{title}</h2>

        <Button
          variant="outlined"
          onClick={() => btnSeeAll(url.url, { state: url.query })}
          sx={{ fontSize: { xs: 10, sm: 12 } }}
        >
          see all
        </Button>
      </div>
      <div className="products-cards">
        <Swiper
          slidesPerView={"auto"}
          navigation={window.innerWidth <= 600 ? false : true}
          modules={[Navigation]}
        >
          {products.map((product, index) => (
            <SwiperSlide className="swiperSlide" key={index}>
              <HomeProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ProductSlider;

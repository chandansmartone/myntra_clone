import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Rating from "@mui/material/Rating";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../../redux/actions/productActions";
import { ADD_TO_CART, CLEAR_CART_ERRORS } from "../../redux/reducers/cartSlice";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import StarIcon from "@mui/icons-material/Star";
import millify from "millify";
import "./ProductDetails.css";
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { CLEAR_ERRORS } from "../../redux/reducers/productSlice";
import { addToCart } from "../../redux/actions/cartActions";
import ProductSlider from "../Home/ProductSlider";
import axios from "../../axiosConfig";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const [currentRating, setCurrentRating] = useState(0);

  // redux states
  const { product, error, loading, similar_products, message } = useSelector(
    (state) => state.products
  );
  const { cart_error, cart_message } = useSelector((state) => state.cart);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  // handler functions
  const addToCartHandler = () => {
    dispatch(addToCart(product._id));
  };

  const handleRatingChange = async (event, newValue) => {
    try {
      setCurrentRating(newValue);
      await axios.post("/api/product/rate", { productId, rating: newValue });
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong.");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(message);
      dispatch(CLEAR_ERRORS());
      return;
    }
    if (cart_message) {
      if (cart_error) {
        toast.error(cart_message);
        dispatch(CLEAR_CART_ERRORS());
      } else {
        toast.success(cart_message);
        dispatch(CLEAR_CART_ERRORS());
      }
    }
    const fetchCurrentRating = async () => {
      try {
        const { data } = await axios.get(`/api/product/rate/${productId}`);
        setCurrentRating(data);
      } catch {}
    };
    fetchCurrentRating();

    dispatch(getProductDetails(productId));
  }, [cart_error, cart_message, dispatch, error, message, productId]);

  return loading ? (
    <Loader />
  ) : (
    product && (
      <>
        <div className="product-details-page">
          <div className="product-details">
            <Swiper
              className="product-details-swiper"
              spaceBetween={30}
              centeredSlides={true}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: true,
              }}
              pagination={{
                clickable: true,
              }}
              // navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
            >
              {product.Images &&
                product.Images.map((item, i) => (
                  <SwiperSlide key={i} className="swiperSlide-product-images">
                    <img
                      className="carousel-image"
                      key={i}
                      src={item}
                      alt={`${i} Slide`}
                    />
                  </SwiperSlide>
                ))}
            </Swiper>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product.productId}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating
                  precision={0.1}
                  readOnly
                  value={Math.round(product.rating * 10) / 10}
                />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({millify(product.ratingCount, { lowercase: true })} ratings)
                </span>
              </div>
              <div className="detailsBlock-3">
                <div className="detailsBlock-price-detailsBlock">
                  <h2>{`₹${product.price}`}</h2>

                  {product.mrp > product.price && (
                    <span className="mrp">{`₹${product.mrp}`}</span>
                  )}
                  {product.discount > 0 && (
                    <span className="discount">
                      {product.discountDisplayLabel}
                    </span>
                  )}
                </div>

                <p>
                  Status:
                  <b
                  // className={product.stock < 1 ? "redColor" : "greenColor"}
                  >
                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>

                <div className="detailsBlock-3-1">
                  <button
                    disabled={product.stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    ADD TO BAG
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="rate-product">
            <h2>YOUR RATING</h2>
            <Rating
              size="large"
              precision={1}
              value={currentRating}
              onChange={handleRatingChange}
              disabled={!isAuthenticated}
            />
          </div>

          <ProductSlider
            title="Smilar Products"
            url={{
              url: `/similar-to-${product.productId}`,
              query: { category: product.category, brand: product.brand },
            }}
            similar_products={similar_products}
            // productUrl={`/api/product?category=${product.category}&brand=${product.brand}`}
          />
        </div>
      </>
    )
  );
};

export default ProductDetails;

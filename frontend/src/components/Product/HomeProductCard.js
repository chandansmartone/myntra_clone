import React from "react";
import StarIcon from "@mui/icons-material/Star";
import millify from "millify";
import "./style.css";
import { useNavigate } from "react-router-dom";

const HomeProductCard = (props) => {
  const navigate = useNavigate();
  const {
    landingPageUrl,
    name,
    displayImage,
    additionalInfo,
    rating,
    ratingCount,
    price,
  } = props.product;
  return (
    <div
      className="home-product-card"
      onClick={() => navigate(`/${landingPageUrl}`)}
    >
      <div className="product-card-img-container">
        <img src={displayImage} alt={name} />
        <div className="product-card-ratings">
          <span>{millify(rating)}</span>
          <StarIcon color="primary" sx={{ fontSize: { xs: 12, sm: 14 } }} />
          <div className="product-card-ratings-info">
            <span>|</span>
            {millify(ratingCount, { lowercase: true })}
          </div>
        </div>
      </div>
      <div className="home-product-card-product-info">
        <h4>{additionalInfo}</h4>
        <div className="product-card-product-price-info">
          <span className="price">{`₹${price}`}</span>
        </div>
      </div>
    </div>
  );
};

export default HomeProductCard;

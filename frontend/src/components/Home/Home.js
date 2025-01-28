import ProductSlider from "./ProductSlider.js";
import HomeSlider from "./Slider";
import TopPicks from "./TopPicks.js";
import cashback_200 from "../../assets/cashback_200.png";
import offer_1 from "../../assets/offer_1.png";
import Footer from "./Footer.js";

import "./styles.css";

const Home = () => {
  return (
    <div className="home-page page">
      <HomeSlider />
      <ProductSlider
        title="New Arrivals"
        url={{ url: "/new-arrivals", query: {} }}
        productUrl="/api/product"
      />
      <img src={offer_1} alt="Cashback offer" />
      <TopPicks />
      <ProductSlider
        title="Men Shirts"
        url={{
          url: "/men-shirts",
          query: { gender: "Men", category: "Shirts" },
        }}
        productUrl="/api/product?gender=Men&category=shirts"
      />
      <img
        src={cashback_200}
        alt="Cashback offer"
        style={{ margin: "0 20px" }}
      />
      <ProductSlider
        title="Top Sneakers"
        url={{
          url: "/shoes",
          query: { q: "sneakers" },
        }}
        productUrl="/api/product?q=sneakers"
      />
      <ProductSlider
        title="Sarees"
        url={{
          url: "/sarees",
          query: { category: "sarees" },
        }}
        productUrl="/api/product?category=sarees"
      />
      <ProductSlider
        title="Top Jeans"
        url={{
          url: "/jeans",
          query: { category: "jeans" },
        }}
        productUrl="/api/product?category=jeans"
      />
      <ProductSlider
        title="Kurtas"
        url={{
          url: "/kurtas",
          query: { category: "kurtas" },
        }}
        productUrl="/api/product?category=kurtas"
      />
      <ProductSlider
        title="Jackets"
        url={{
          url: "/jackets",
          query: { gender: "Men", category: "jackets" },
        }}
        productUrl="/api/product?category=jackets&gender=Men"
      />
      <ProductSlider
        title="Dresses"
        url={{
          url: "/dresses",
          query: { category: "dress", gender: "Women" },
        }}
        productUrl="/api/product?category=dress&gender=Women"
      />
      <Footer />
    </div>
  );
};

export default Home;

import React from "react";
import { Link } from "react-router-dom";

const lists = [
  {
    img: "https://assets.myntassets.com/w_140,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/23/062cea23-9a6a-44b9-bdd4-87cae6a462311645602543339-Kurta-sets.jpg",
    alt: "Kurta sets",
    link: "/kurta-sets",
    state: {
      category: "Kurta Sets",
      price: { $lte: 1299 },
    },
  },
  {
    img: "https://assets.myntassets.com/w_140,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/23/f08e2bac-9bed-4f87-b022-0dce8defeded1645602543380-Men-Trousers.jpg",
    alt: "Men Trousers",
    link: "/men-trousers",
    state: {
      category: "Trousers",
      gender: "Men",
      price: { $lte: 899 },
    },
  },
  {
    img: "https://assets.myntassets.com/w_140,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/23/2f410d81-7fae-400e-9ecc-b4a8b6df72b91645602543430-Women-Jeans.jpg",
    alt: "Jeans",
    link: "/jeans",
    state: {
      category: "Jeans",
      price: { $lte: 999 },
    },
  },
  {
    img: "https://assets.myntassets.com/w_140,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/23/c6b09c0f-5c57-472c-a3fc-854ec506a90e1645602543387-Men-T-shirt.jpg",
    alt: "T-Shirts",
    link: "/t-shirts",
    state: {
      category: "tShirt",
      gender: "Men",
      price: { $lte: 499 },
    },
  },
  {
    img: "https://assets.myntassets.com/w_140,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/23/8d65d400-decd-4f42-902c-a40350a16ed11645602543346-Kurtas.jpg",
    alt: "Kurtas",
    link: "/kurtas-women",
    state: {
      category: "kurta",
      price: { $lte: 799 },
    },
  },
  {
    img: "https://assets.myntassets.com/w_140,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/23/398ee53b-5899-4a9a-9d0b-b35d60c01cb41645602543325-Dresses.jpg",
    alt: "dresses",
    link: "/dresses",
    state: {
      category: "dresses",
      gender: "Women",
      price: { $lte: 899 },
    },
  },
  {
    img: "https://assets.myntassets.com/w_140,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/23/82a9be01-3032-4725-9500-bcc94366b7931645602543399-Mens-Shirts.jpg",
    alt: "Mens-Shirts",
    link: "/men-shirts",
    state: {
      category: "Shirts",
      gender: "Men",
      price: { $lte: 799 },
    },
  },
];

const TopPicks = () => {
  return (
    <div className="home-sub-container">
      <h2 className="home-sub-container-title">Top Picks</h2>

      <div className="home-sub-container-content">
        {lists.map((list, key) => (
          <Link to={list.link} state={list.state} key={key}>
            <img src={list.img} alt={list.alt} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopPicks;

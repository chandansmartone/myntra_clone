import React from "react";
import Profile from "@mui/icons-material/PermIdentityOutlined";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import Search from "./Search";
import Cart from "./Cart";
import "./style.css";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const [display, setDisplay] = React.useState("");
    const styles = {
      
      display:display
    };
    const [display1, setDisplay1] = React.useState("");
    const styles1 = {
      
      display:display1
    };
  const { isAuthenticated } = useSelector((state) => state.user);

  const redirect = isAuthenticated ? "/account" : "/login";

  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="PerfectFit Logo" width="50px" height="50px" />
        </Link>
      </div>
      <nav className="nav">
        <ul className="categories">
          <div className="menscat" onMouseEnter={()=> setDisplay("flex")} onMouseLeave={()=>setDisplay("none")}>
          <li>
            <Link to="/Men" state={{ gender: "Men", sort: "rating" }}>
              Men
            </Link>
          </li>
          <div style={styles} onMouseEnter={()=> setDisplay("flex")} onMouseLeave={()=>setDisplay("none")} className="down">
          <li>
            <Link to="/shirt" state={{ gender: "Men" ,category: "shirts"}}>SHIRTS</Link>
            </li>
            <li>
            <Link to="/T-shirts" state={{ gender: "Men" ,category: "tShirts"}}>T-SHIRTS</Link>
            </li>
             
             <li>
            <Link to="/men-jeans" state={{ gender: "Men" ,category: "jeans"}}>JEANS</Link>
            </li>
            
            <li>
            <Link to="/Shoes" state={{ gender: "Men" ,category: "shoes"}}>SHOES</Link>
            </li>
          </div>
          </div>
          <div className="menscat" onMouseEnter={()=> setDisplay1("flex")} onMouseLeave={()=>setDisplay1("none")}>
          
          <li>
            <Link to="/Women" state={{ gender: "Women" }}>
              Women
            </Link>
          </li>
          <div style={styles1} onMouseEnter={()=> setDisplay1("flex")} onMouseLeave={()=>setDisplay1("none")} className="down">
          <li>
            <Link to="/saree" state={{ category: "sarees" }}>SAREES</Link>
            </li> 
            
            <li>
            <Link to="/Shirts" state={{ category: "shirts"}}>SHIRTS</Link>
            </li>
            <li>
            <Link to="/kurta-sets" state={{ category: "kurta"}}>KURTHA</Link>
            </li>
            <li>
            <Link to="/jeans" state={{ category: "jeans"}}>JEANS</Link>
            </li>
          </div>
          </div>
          <li>
            <Link to="/Kids" state={{ gender: "Kids" }}>
              Kids
            </Link>
          </li>
        </ul>
        </nav>
      <Search />
      <div className="nav-icons">
        <Profile
          sx={{ cursor: "pointer" }}
          onClick={(e) => navigate(redirect)}
        />
        <Cart />
      </div>
    </header>
  );
};

export default Header;

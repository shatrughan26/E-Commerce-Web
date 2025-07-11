import React,{useState} from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { FaTimes, FaBars, FaQuestionCircle } from "react-icons/fa";
import { Input } from "postcss";


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return(
        <nav className={`navbar ${isOpen ? "sidebar-open" : ""}`}>
            <Link to= "/" className="logo-link">
                <div className="logo-box">
                    <h2 className="logo-text">Shree Shyam </h2>
                    <h2 className="logo-text2">Enterprises</h2>
                </div>
            </Link>
                <input
                    id="input-box"
                    type="text"
                    placeholder="Search Products"
                    className="search-input"
                />

            <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <FaTimes /> : <FaBars/>}
            </button>

            <div className={`sidebar ${isOpen ? "open" : ""}`}>
                {/* Home link */}
                <Link to= "/" onClick={()=> setIsOpen(false)} className="home">
                    Home
                </Link>

                {/* About Link */}
                <Link to= "/about" onClick={()=> setIsOpen(false)} className="about">
                    Products
                </Link>

                {/* cart Link */}
                <Link to= "/cart" onClick={()=> setIsOpen(false)}className="cart">
                    Cart
                </Link>

                {/* dark Mode
                <Link to= "/" className="darkmode">
                    <FaMoon />Dark Mode
                </Link> */}

                {/* Login link */}
                <Link to= "/login" onClick={()=> setIsOpen(false)}className="login">
                    Login
                </Link>
            </div>
        </nav>
    )
}
export default Navbar
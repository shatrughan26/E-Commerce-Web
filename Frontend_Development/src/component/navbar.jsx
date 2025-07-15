import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import AdminButton from "./AdminButton";
import AdminLogin from "../Routes/AdminLogin";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => setIsOpen(!isOpen);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
            <Link className="navbar-brand d-flex flex-column" to="/">
                <span className="fw-bold fs-4">Shree Shyam</span>
                <span className="fs-6">Enterprises</span>
            </Link>

            <button className="navbar-toggler ms-sm-auto" type="button" onClick={toggleNavbar}>
                {isOpen ? <FaTimes /> : <FaBars />}
            </button>

                <form className="d-flex-grow-1 ms-lg-auto py-1 w-100 md-order-1" role="search">
                    <input
                        className="form-control"
                        type="search"
                        placeholder="Search Products"
                        aria-label="Search"
                        style={{
                            width: "100%",          // fill available space
                     // increase this for desktop
                        }}
                    />
                </form>

            <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0 px-4">
                    <li className="nav-item">
                        <Link className="nav-link px-4" to="/" onClick={() => setIsOpen(false)}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link px-4" to="/about" onClick={() => setIsOpen(false)}>Products</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link px-4" to="/cart" onClick={() => setIsOpen(false)}>Cart</Link>
                    </li>
                    <li className="nav-item">
                    <button
                        className="btn nav-link px-4 bg-transparent border-0"
                        data-bs-toggle="modal"
                        data-bs-target="#loginModal"
                        onClick={() => setIsOpen(false)}
                    >
                        Login
                    </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

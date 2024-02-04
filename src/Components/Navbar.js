import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const favoritesCount = useSelector(
        (state) => state.favorites.favoritesCount || 0
    );

    const cartCount = useSelector(
        (state) => state.cart.cartCount || 0
    );

    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#454545', fontSize: '20px' }}>
            <div className="container-fluid">
                <Link
                className="navbar-brand d-flex align-items-center ms-5"
                to="#"
                style={{
                    backgroundImage: 'linear-gradient(50deg, #454545, #A87493, #E9CDDE)',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    fontSize: '30px',
                    fontWeight: 'bold',}}>
                        E-Commerce
                </Link>
                <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <Link className="nav-link pt" to="/ProductList" 
                        style={{ color: 'transparent', backgroundImage: 'linear-gradient(50deg, #454545, #A87493, #E9CDDE)', WebkitBackgroundClip: 'text' }}>
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Favorite" 
                        style={{ color: 'transparent', backgroundImage: 'linear-gradient(50deg, #454545, #A87493, #E9CDDE)', WebkitBackgroundClip: 'text' }}>
                            Favorites
                        </Link>
                        {favoritesCount > 0 && (
                        <span className="custom-badge my-2">{`${favoritesCount}`}</span>)}
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/cart" 
                        style={{ color: 'transparent', backgroundImage: 'linear-gradient(50deg, #454545, #A87493, #E9CDDE)', WebkitBackgroundClip: 'text' }}>
                            Cart
                        </Link>
                        {cartCount > 0 && (
                        <span className="custom-badge my-2">{`${cartCount}`}</span>)}
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/SignUp" 
                        style={{ color: 'transparent', backgroundImage: 'linear-gradient(50deg, #454545, #A87493, #E9CDDE)', WebkitBackgroundClip: 'text' }}>
                            Signup
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Login" 
                        style={{ color: 'transparent', backgroundImage: 'linear-gradient(50deg, #454545, #A87493, #E9CDDE)', WebkitBackgroundClip: 'text' }}>
                            Login
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
        </nav>
    );
};

export default Navbar;

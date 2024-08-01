import { Link } from "react-router-dom";
import "./index.css";

function Navbar() {
    return (
        <div className="header">
            <img className="logo" alt="logo" src="https://res.cloudinary.com/dwgg5pyqk/image/upload/v1722484947/popcorn_shnw6o.png" />
            <Link className="navbar-title" to="/">
                <h1>Movie'z</h1>
            </Link>
            <img
                className="profile"
                src="https://res.cloudinary.com/dwgg5pyqk/image/upload/v1702493738/willoy-purple-user-icon_dd33u5.png"
                alt="profile"
            />
        </div>
    );
}

export default Navbar;

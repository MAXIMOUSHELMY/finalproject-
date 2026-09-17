import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, Heart, User } from "lucide-react";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="navbar-logo">
          STORE
        </Link>

        {/* Links */}
        <div className="navbar-links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Products
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Contact
          </NavLink>
        </div>

        {/* Actions */}
        <div className="navbar-actions">

          <Link to="/wishlist" className="nav-icon">
            <Heart size={20} />
          </Link>

          <Link to="/cart" className="nav-icon">
            <ShoppingCart size={20} />
          </Link>

          <Link to="/login" className="nav-login">
            <User size={18} />
            <span>Login</span>
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;
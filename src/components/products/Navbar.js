import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authActions";
import "./styles.css";

const Navbar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  };

  return (
    <div class="topnav">
      <div class="topnav-left">
        <a href="" className="logo">
          Products
        </a>
      </div>

      <div class="topnav-right" onClick={handleLogout}>
        <div className="logout-button">
          <i class="cis-account-logout"></i>Logout
        </div>
      </div>
    </div>
  );
};

export default Navbar;

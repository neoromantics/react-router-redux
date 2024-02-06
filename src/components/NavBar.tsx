import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mx-3">
            <NavLink className="btn btn-primary" to="/">
              Incompleted
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="btn btn-secondary" to="/completed">
              Completed
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;

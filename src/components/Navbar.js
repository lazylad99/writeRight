import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  return (
    <nav
      className={`navbar navbar-expand-lg  ${props.darkMode
          ? "dark-bg"
          : "light-bg"
        }`}
    >
      <div className="container-fluid ms-auto">
        <Link className={`navbar-brand fs-2 ${ props.darkMode ? "darktext" : "lighttext" }`} to="/">
          WriteRight
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className={`nav-link fs-5 fw-bold ${ props.darkMode ? "text-light " : "text-dark" }`} aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link fs-5 fw-bold  ${ props.darkMode ? "text-light" : "text-dark" }`} to="/about">
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="form-check form-switch px-5">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          onClick={props.toggle}
        />
        <label className="form-check-label fs-5 fw-bold " htmlFor="flexSwitchCheckDefault">
          {props.darkMode ? "Dark" : "Light"}
        </label>
      </div>
    </nav>
  );
}

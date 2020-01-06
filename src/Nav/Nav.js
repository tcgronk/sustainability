import React from "react";
import { Link } from "react-router-dom";
import monstrera from "../monstrera.png";
import "./Nav.css";

function Nav() {
  return (
    <div className="Nav">
      <Link className="link" to="/">
        <h1>
          Shop Sustainably{" "}
          <img src={monstrera} alt="monstrera-leaf" className="monstrera" />{" "}
        </h1>
      </Link>
      <div className="Buttons">
        <Link to="/addstore">
          <button className="navButton">Add Store</button>
        </Link>
        <Link to="/all-stores">
          <button className="navButton">All stores</button>
        </Link>
      </div>
    </div>
  );
}

export default Nav;

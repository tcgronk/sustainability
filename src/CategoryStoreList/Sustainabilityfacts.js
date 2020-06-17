import React, { Component } from "react";
import onlineshopping from "../onlineshopping.png";

export default class Sustainabilityfacts extends Component {
  render() {
    return (
      <div className="Sustainability-facts">
        <img
          className="online-shopping-icon"
          src={onlineshopping}
          alt="shopping"
        />
        <p className="Sustainability-facts-text">
          A 2013 study from MIT suggests that online shopping is far more
          eco-friendly than shopping in brick-and-mortar stores.
        </p>
      </div>
    );
  }
}

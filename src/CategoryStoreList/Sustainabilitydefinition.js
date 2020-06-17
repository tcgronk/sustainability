import React, { Component } from "react";
import store from "../Store.png";

export default class Sustainabilitydefinition extends Component {
  render() {
    return (
      <div className="Sustainability-definition">
        <img className="store" src={store} alt="store" />
        <p className="definition">
          Sustainability can include eliminating waste in their supply chain and
          business practices, creating sustainable alternatives to traditionally
          wasteful products, donating proceeds to environmentally concious
          non-profits, or up-cycling. Know of a sustainable store that more
          people should know about? Add it to the list!
        </p>
      </div>
    );
  }
}

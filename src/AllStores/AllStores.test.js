import React from "react";
import ReactDOM from "react-dom";
import AllStores from "./AllStores";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AllStores />, div);
  ReactDOM.unmountComponentAtNode(div);
});

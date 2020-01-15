import React from "react";
import ReactDOM from "react-dom";
import AddStore from "./AddStore";
import { shallow, configure } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AddStore />, div);
  ReactDOM.unmountComponentAtNode(div);
});

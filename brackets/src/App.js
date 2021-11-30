import React, { Component } from "react";
import { render } from "react-dom";
import Home from "./Home";
import Bracket from "./Bracket";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="center">
        <Home />
      </div>
    );
  }
}

// Frank Ocean
// Tyler
// Childish Gambino
// Daniel Caesar
// Kendrick Lamar
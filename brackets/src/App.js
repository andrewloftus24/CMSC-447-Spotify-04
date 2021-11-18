import React, { Component } from "react";
import { render } from "react-dom";
import Bracket from "./Bracket";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="center">
        <Bracket />
      </div>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);

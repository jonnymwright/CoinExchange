import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";

import NavBarView from "./NavBar/NavBarView";
import BodyView from "./Body/BodyView";

export class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBarView />
        <div className="container">
          <BodyView />
        </div>
      </div>
    );
  }
}

App.propTypes = {};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(App);

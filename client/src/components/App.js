import React, { Component } from 'react';
import {connect} from 'react-redux';
import logo from '../logo.svg';
import './App.css';

import NavBarView from './NavBar/NavBarView'

export class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBarView></NavBarView>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

App.propTypes = {
};

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(App);

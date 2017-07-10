import React, { Component } from 'react';
import logo from './thw.svg';
import './App.css';
import Menu from './menu.js';

class App extends Component {
  render() {
    return (
      <div className="App">

        <img src={logo} className="my-icon" alt="logo" />

        <Menu items={ ['Home', 'Posts', 'About'] } />

        <Welcome> </Welcome>
      </div>
    );
  }
}

class Welcome extends Component {
  render() {
    return (
      <p className="App-intro">
          Welcome to my home !
      </p>
    );
  }
}

export default App;

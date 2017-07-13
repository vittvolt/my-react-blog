import React, { Component } from 'react';
import logo from './thw.svg';
import './App.css';
import Menu from './menu.jsx';
import axios from 'axios';
import Markdown from 'react-remarkable';

// The tabs at the top
const tabs = [
  {'id' : 1, 'title' : 'Home'},
  {'id' : 2, 'title' : 'Posts'},
  {'id' : 3, 'title' : 'About'}
]

// Welcome string
const welcome = "Been there, never done that"

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currIndex: 0,
      welcomeStr: welcome,
      text: "",
      aboutText: welcome
    };
  }

  componentDidMount() {
    axios.get('/posts')
      .then(function (response) {
        var t = String(response.data);
        this.setState({text: t});
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
  }

  // Update the tab views
  handleClick(index) {
    // console.log(index);
    this.setState({currIndex: index});
  }

  render() {
    return (
      <div className="App">

        <img src={logo} className="my-icon" alt="logo" />

        <a className="Banner" href="https://github.com/vittvolt">
          Github
        </a>

        <Menu items={ tabs } handleClick={this.handleClick.bind(this)} />

        {this.state.currIndex === 0 ? <Content art={1} text={this.state.welcomeStr} class={"App-welcome"} /> : null}
        {this.state.currIndex === 1 ? <Content text={this.state.text} class={"App-text"} /> : null}
        {this.state.currIndex === 2 ? <Content text={this.state.aboutText} class={"App-welcome"} /> : null}
      </div>
    );
  }
}

class Content extends Component {
  render() {
    return (
      <div className={this.props.class}>
        {this.props.art ?
          <p className="Neon-t">
            <a>
              T
            </a>
          </p>
          :
          <Markdown>
            {this.props.text}
          </Markdown>
        }
      </div>
    );
  }
}

export default App;

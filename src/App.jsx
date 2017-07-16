import React, { Component, PropTypes } from 'react';
import logo from './static/thw.svg';
import './css/App.css';
import Menu from './menu.jsx';
import axios from 'axios';
import Markdown from 'react-remarkable';
import { BrowserRouter, Route } from 'react-router-dom';
import Posts from './jsx/Posts.jsx';

// The tabs at the top
const tabs = [
  {'id' : 1, 'title' : 'Home', 'route' : '/home'},
  {'id' : 2, 'title' : 'Posts', 'route' : '/allposts'},
  {'id' : 3, 'title' : 'About', 'route' : '/about'}
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
      aboutText: welcome,

      titles: []
    };
  }

  componentDidMount() {
    axios.get('/posts/brief')
      .then(function (response) {
        this.setState({titles: response.data});
        console.log(response.data);
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
      <BrowserRouter>
        <div className="App">

          <img src={logo} className="my-icon" alt="logo" />

          <a className="Banner" href="https://github.com/vittvolt">
            Github
          </a>

          <Menu items={ tabs } handleClick={this.handleClick.bind(this)} />

          <Route path='/home' render={(props) => (
            <Content {...props} art={1} text={this.state.welcomeStr} class={"App-welcome"} />
          )}/>

          {/* Default route is the home component as well */}
          <Route exact path='/' render={(props) => (
            <Content {...props} art={1} text={this.state.welcomeStr} class={"App-welcome"} />
          )}/>

          <Route path='/allposts' render={props => (
            <Posts {...props} titles={this.state.titles} />
          )}/>

          <Route path='/about' render={props => (
            <Content {...props} text={this.state.aboutText} class={"App-welcome"} />
          )}/>

        </div>
      </BrowserRouter>
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

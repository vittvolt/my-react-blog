import React, { Component, PropTypes } from 'react';
import logo from './static/thw.svg';
import './css/App.css';
import Menu from './menu.jsx';
import axios from 'axios';
import Markdown from 'react-remarkable';
import { BrowserRouter, Route } from 'react-router-dom';
import Posts from './jsx/Posts.jsx';
import Post from './jsx/Post.jsx';

// The tabs at the top
const tabs = [
  {'id' : 1, 'title' : 'Home', 'route' : '/home'},
  {'id' : 2, 'title' : 'Posts', 'route' : '/allposts'},
  {'id' : 3, 'title' : 'About', 'route' : '/about'}
];

// Welcome string
const welcome = "An experimental blog.";
const about = "Been there, never done that.";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currIndex: 0,
      welcomeStr: welcome,
      text: "Test ...",
      aboutText: about,

      posts: []
    };
  }

  componentDidMount() {
    axios.get('/posts/meta')
      .then(function (response) {
        this.setState({ posts: response.data });
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
            <Welcome {...props} art={1} text={this.state.welcomeStr} class={"App-text"} />
          )}/>

          {/* Default route is the home component as well */}
          <Route exact path='/' render={(props) => (
            <Welcome {...props} art={1} text={this.state.welcomeStr} class={"App-text"} />
          )}/>

          <Route exact path='/allposts' render={props => (
            <Posts {...props} posts={this.state.posts} />
          )}/>

          <Route path='/about' render={props => (
            <Content {...props} text={this.state.aboutText} class={"App-welcome"} />
          )}/>

          {/**
           * Displaying a single post
           */}
          <Route path='/allposts/:postId' render={(props) => (
            <Post {...props} />
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

class Welcome extends Component {
  render() {
    return (
      <div className='App-text'>
        <p>
          {this.props.text}
        </p>
      </div>
    );
  }
}

export default App;

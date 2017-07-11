import React, { Component } from 'react';
import logo from './thw.svg';
import './App.css';
import Menu from './menu.jsx';
import axios from 'axios';
import Markdown from 'react-remarkable';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "Hello"
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

  render() {
    return (
      <div className="App">

        <img src={logo} className="my-icon" alt="logo" />

        <Menu items={ ['Home', 'Posts', 'About'] } />

        <Content text={this.state.text}> </Content>
      </div>
    );
  }
}

class Content extends Component {
  render() {
    return (
      <div className="App-text">
        <Markdown>
          {this.props.text}
        </Markdown>
      </div>
    );
  }
}

export default App;

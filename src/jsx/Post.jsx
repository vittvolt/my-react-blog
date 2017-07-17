import React, { Component } from 'react';
import Markdown from 'react-remarkable';
import axios from 'axios';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
        text : "..."
    }

    // Get the post from server
    axios.get('/posts/' + this.props.match.params.postId)
      .then(function (response) {
        this.setState({text: response.data});
      }.bind(this))
      .catch(function (err) {
        console.log(err);
      });
  }

  render() {
    return <div className={this.props.class}>
      <Markdown>
        {this.state.text}
      </Markdown>
    </div>
  }
}

export default Post;
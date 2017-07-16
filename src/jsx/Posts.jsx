import React, { Component } from 'react';
import Markdown from 'react-remarkable';

import '../css/Posts.css';

class Posts extends Component {

  render() {
    return (
      <div>
        <ul className='Posts-list'>
          {
            this.props.titles.map(function(m, index) {
              return <li key={m.index}>
                <h4> this.state.titles.title </h4>
                <p> Well... </p>
              </li>
            }.bind(this))
          }
        </ul>
      </div>
    );
  }
}

export default Posts;
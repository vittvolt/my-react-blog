import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../css/Posts.css';

class Posts extends Component {

  render() {
    return (
      <div>
        <ul className='Posts-list'>
          {
            this.props.posts.map(function(m, index) {
              return <li key={m.index}>
                <Link className='Post-link' to={'/allposts/' + m.index.toString()}> {m.title} </Link>
                <hr/>
                <p> {m.brief} </p>
              </li>
            }.bind(this))
          }
        </ul>
      </div>
    );
  }
}

export default Posts;
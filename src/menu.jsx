import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {focused: 0};
    }

    clicked(index) {
        this.setState({focused: index});
        // this.props.handleClick(index);
    }

    render() {
        var self = this;

        return (
            <div>
                <ul className="menu-list">{ this.props.items.map(function(m, index){

                    return <li onClick={self.clicked.bind(self, index)} key={m.id}>
                        <p className='Neon-p'>
                            <Link to={m.route} className='Blue-neon'>
                                {m.title}
                            </Link>
                        </p>
                    </li>;

                }) }

                </ul>
            </div>
        );

    }
}

export default Menu;
import React, { Component } from 'react';

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {focused: 0};
    }

    clicked(index) {
        this.props.handleClick(index);
    }

    render() {
        var self = this;

        return (
            <div>
                <ul className="menu-list">{ this.props.items.map(function(m, index){

                    var style = '';

                    if(self.state.focused === index){
                        style = 'focused';
                    }

                    return <li className={style} onClick={self.clicked.bind(self, index)} key={m.id}>{m.title}</li>;

                }) }

                </ul>
            </div>
        );

    }
}

export default Menu;
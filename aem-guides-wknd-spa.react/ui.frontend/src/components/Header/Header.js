//Header.js
import React, {Component} from 'react';
require('./Header.css');

export default class Header extends Component {

    render() {
        return (
            <header className="Header">
                <div className="Header-container">
                    <h2>Testing AEM CRUD APP</h2>
                </div>
            </header>
        );
    }
}

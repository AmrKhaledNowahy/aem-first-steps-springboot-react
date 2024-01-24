//Header.js
import React, {Component} from 'react';
require('./Header.css');

export default class Header extends Component {

    render() {
        return (
            <header className="Header">
                <div className="Header-container">
                    <h2>AEM Dynamic Server CRUD APP</h2>
                </div>
            </header>
        );
    }
}

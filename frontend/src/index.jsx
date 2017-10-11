require('file-loader?name=[name].[ext]!./static/index.html');
require('file-loader?name=[name].[ext]!./static/favicon.ico');

/* React Framework Components */
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

class HomePage extends React.Component {
    render() {
        return (
            <div>
                <h1>Find me on
                    <a href="https://t.me/lod_bot">Telegram</a>
                </h1>
            </div>
        );
    }
}
ReactDOM.render(
    <HomePage/>, document.getElementById("react-app"))

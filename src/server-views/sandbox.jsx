'use strict';

var getWebpackAssets = require('../tools/get-webpack-assets');
var React = require('react');

var Sandbox = React.createClass({

    render: function () {
        return (
            <html>
                <head>
                    <meta charSet='utf-8' />
                    <title>Sandbox</title>
                    <script src={getWebpackAssets().sandbox.js}></script>
                </head>
                <body>
                    <div id='appContainer'>This text will be replaced by Counter component</div>
                </body>
            </html>
        );
    }
});

module.exports = Sandbox;

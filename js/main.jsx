var React = require('react');
var ReactDOM = require('react-dom');
// var HelloWorld = require('./helloworld.jsx');
var Song = require('./song.jsx');
var SongList = require('./songlist.jsx');
var App = require('./app.jsx');


ReactDOM.render(
  <App/>, document.getElementById('app-container')
);



//dev tools
window.React = React;

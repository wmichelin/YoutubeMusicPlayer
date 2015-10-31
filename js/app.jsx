var SongList = require('./songlist.jsx');
var React = require('react');
var Sidebar = require('react-sidebar');

var styles = {
  contentHeaderMenuLink: {
    textDecoration: 'none',
    color: 'white',
    padding: 8
  },
  content: {
    padding: '16px'
  }
}

var App = React.createClass({
  getInitialState () {
    return {
      docked: false,
      open: false
    };
  },

  onSetSidebarOpen: function(open) {
    this.setState({
      sidebarOpen: open
    });
  },

  componentWillMount: function() {
    var mql = window.matchMedia(`(min-width: 800px)`);
    mql.addListener(this.mediaQueryChanged);
    this.setState({
      mql: mql,
      docked: mql.matches
    });
  },

  componentWillUnmount: function() {
    this.state
      .mql
      .removeListener(this.mediaQueryChanged);
  },

  mediaQueryChanged: function() {
    this.setState({
      sidebarDocked: this.state.mql.matches
    });
  },

  render: function() {
    var sidebarContent = (
      <SongList/>
    );

    return (
      <Sidebar sidebar={sidebarContent} open={this.state.sidebarOpen} docked={this.state.sidebarDocked} onSetOpen={this.onSetSidebarOpen}>
        <b>Main content</b>
      </Sidebar>
    );
  }

  // getInitialState: function() {
  //   return {
  //     sidebarOpen: false
  //   }
  // },
  // onSetSidebarOpen: function(open) {
  //   this.setState({
  //     sidebarOpen: open
  //   });
  // },
  // render: function() {
  //   var sidebarContent = <div>test</div>
  //
  //   return (
  //     // <div className="container">
  //     //   <div className="sidebar">
  //     //     .sidebar {sidebarContent}
  //     //   </div>
  //     //   <div className="video-container">
  //     //     .video-container
  //     //   </div>
  //     // </div>
  //     <Sidebar sidebar={sidebarContent}
  //        open={this.state.sidebarOpen}
  //        onSetOpen={this.onSetSidebarOpen}>
  //        <b>Main content</b>
  //     </Sidebar>
  //
  //   );
  // }
});

module.exports = App;

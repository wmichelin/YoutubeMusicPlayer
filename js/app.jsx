var SongList = require('./songlist.jsx');
var React = require('react');
var Sidebar = require('react-sidebar');

var styles = {
  contentHeaderMenuLink: {
    textDecoration: 'none',
    color: 'black',
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

  onSetOpen: function(open) {
    this.setState({
      open: open
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
    this.state.mql.removeListener(this.mediaQueryChanged);
  },

  mediaQueryChanged: function() {
    this.setState({
      docked: this.state.mql.matches
    });
  },
  toggleOpen(ev) {
    this.setState({open: !this.state.open});

    if (ev) {
      ev.preventDefault();
    }
  },

  render: function() {
    var sidebarContent = (
      <SongList/>
    );

    var contentHeader = (
      <span>
        {!this.state.docked &&
          <a onClick={this.toggleOpen} href="#" style={styles.contentHeaderMenuLink}>PRESS TO OPEN</a>}
        <span> Responsive React Sidebar</span>
      </span>
    )

    var sidebarProps = {
      sidebar: sidebarContent,
      docked: this.state.docked,
      open: this.state.open,
      onSetOpen: this.onSetOpen
    }


    return (
      <Sidebar {...sidebarProps}>
        <div className="sidebar-content">
        {contentHeader}
        </div>
      </Sidebar>
    );



  }

  //getInitialState: function() {
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

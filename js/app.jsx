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

  onSetOpen: function(open) {
    this.setState({
      open: open
    });
  },
  componentDidMount: function() {

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
        <span> </span>
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
        <div class="sidebar-wrapper">
          <div className="sidebar-content">
          {contentHeader}
          </div>
        </div>
        <div className="main-content">
          <div id="player"></div>
        </div>
      </Sidebar>
    );



  }

});

module.exports = App;

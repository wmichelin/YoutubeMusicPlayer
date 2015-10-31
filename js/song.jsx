var React = require('react');

var Song = React.createClass({
  getDefaultProps: function() {
    return {
      title: "Title",
      artist: "Artist",
      image_url: ""
    }
  },
  render: function() {
    return (
      <div className="song-wrapper">
        <span className="song-title">
          {this.props.title}
        </span>
        <span className="song-artist">
          {this.props.artist}
        </span>

        <img className="album-image" src={this.props.image_url}></img>
      </div>
    );
  }
});

module.exports = Song;

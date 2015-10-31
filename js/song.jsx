var React = require('react');

var Song = React.createClass({
  getDefaultProps: function() {
    return {
      title: "Title",
      artist: "Artist",
      image_url: "",
      key: -1,
      id: -1
    }
  },
  handleClick: function() {

    if(this.props.id != -1) {
      youtubeController.playVideoByName(this.createQueryString());
    }

    // alert(this.createQueryString());
  },
  createQueryString: function() {
    return this.props.title + " " + this.props.artist;
  },
  render: function() {
    return (
      <div onClick={this.handleClick} className="song-wrapper">
        <div className="song-text-wrapper">
          <div className="song-title">
            {this.props.title}
          </div>
          <div className="song-artist">
            {this.props.artist}
          </div>
        </div>
        <img className="album-image" src={this.props.image_url}></img>
      </div>
    );
  }
});

module.exports = Song;

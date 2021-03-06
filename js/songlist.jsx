var React = require('react');
var Song = require('./song.jsx');
var SongProvider = require('./song-provider.js');
var songSearchAPI = require('./songSearchAPI.js');

var SongList = React.createClass({
  getInitialState: function() {
    return {
      songs: [],
      queryString: ""
    }
  },
  componentDidMount: function() {
    this.setState({
      songs: SongProvider.getSongs()
    });
  },
  onUserInput: function(event) {
    this.setState({
      queryString: event.target.value
    });
  },
  onEnterKeyPress: function(event) {
    event.preventDefault();
    songSearchAPI.executeQuery(this.state.queryString).done(this.updateSongList);
  },
  updateSongList: function(results) {
    console.log(results);
    if(!results){
      return;
    }

    this.setState({
      songs: results
    });

  },
  render: function() {
    // initialize with default column values from the song class
    // there's probably a more decoupled way to do this
    // we don't want to assume that the song class will provide column names
    var songArray = [

    ];

    this
      .state
      .songs
      .forEach(function(song) {
        var test = song.key
        songArray.push(
          <Song
            id={song.key}
            artist={song.artist_name}
            title={song.title}
            image_url={song.image_url}
            />
        );
      });

      console.log(this.state.songs);

    return (
      <div className="song-list-wrapper">
        <div className="songlist-container">
          <SearchBar onUserInput={this.onUserInput} onEnterKeyPress={this.onEnterKeyPress} value={this.state.queryString}/>
          <div className="songs">
            {songArray}
          </div>
        </div>
      </div>
    );
  }
});

var SearchBar = React.createClass({
  //only handle enter key for now
  handleKeyPress: function(event) {
    if(event.which !== 13) {
      return;
    }
    if(!this.props.onEnterKeyPress || typeof this.props.onEnterKeyPress !== "function") {
      return;
    }
    this.props.onEnterKeyPress(event);

  },
  render: function() {
    return (
      <form action="/">
        <input className="search-bar" type="text" onChange={this.props.onUserInput} onKeyPress={this.handleKeyPress} value={this.props.value}/>
      </form>
    );
  }
});

module.exports = SongList;

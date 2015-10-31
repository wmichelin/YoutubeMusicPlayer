var SongProvider = (function(){

  var getSongs = function() {
      return [{
        "artist_id": "-1",
        "key": "-1",
        "artist_name": "",
        "title": "Search for a song"
      }];
  }

  return {
    getSongs: getSongs
  }

})();

module.exports = SongProvider

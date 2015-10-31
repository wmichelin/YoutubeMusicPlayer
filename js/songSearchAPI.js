var _ = require('underscore');

module.exports = {

  executeQuery: function (query) {
    return new Promise(function(resolve, reject) {
      var url = 'https://api.spotify.com/v1/search?&type=track&q=' + query;
      $.ajax({
        type: "GET",
        url: url,
        success: function(results) {
          formattedResults = transformResults(results);
          resolve(formattedResults);
        }
      });
    });


    function transformResults(results) {
      var formattedResults = [];
      var tracksArray = results.tracks;
      tracksArray.items.forEach(function(track){
        var url = "";
        if (track.album.images.length > 0) {
          url = track.album.images[0].url;
        }

        formattedResults.push({
          key: track.id,
          title: track.name,
          artist_name: track.artists[0].name,
          image_url: url
        });
      });

      return _.uniq(formattedResults, function(elem) { return [elem.title, elem.artist_name].join(); });

    }


  }
}

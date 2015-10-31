var youtubeController = (function() {
  var inputHasFocus = false;
  var inputTag = $('.search-bar');
  var testButton = $('#testButton');


  var initialize = function(player) {
    setFocusAndKeyboardFunctionality();
    var player = player;
    $(testButton).on('click', getAndExecuteQuery);
    inputTag.focus();
  }


  function getAndExecuteQuery() {
    var queryString = $(inputTag).val();
    executeQuery(queryString).done(playNewVideo);
  }

  function playVideoByName(name) {
    executeQuery(name).done(playNewVideo);
  }

  function playNewVideo(results) {
    player.loadVideoById({
      'videoId': results.items[0].id.videoId,
      'suggestedQuality': 'large'
    });

    inputTag.focus();
  }


  function executeQuery(query) {
    return new Promise(function(resolve, reject) {
      var url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&key=AIzaSyBGW3_8YPM9IkIFry4QuisFUgvdK_mgtOA&q=' + query;
      $.ajax({
        type: "GET",
        url: url,
        success: function(results) {
          resolve(results);
        }
      });
    });
  }

  function setFocusAndKeyboardFunctionality() {
    $(inputTag).on('blur', function() {
      inputHasFocus = false;
    });

    $(document).on('keypress', function(e) {
      console.log(e);
      if (e.which === 13) {
        // $(testButton).click();
      }
      if (!inputHasFocus) {
        inputTag.focus();
        inputHasFocus = true;
      }
    });
  }


  return {
    initialize: initialize,
    playVideoByName: playVideoByName
  }

})();

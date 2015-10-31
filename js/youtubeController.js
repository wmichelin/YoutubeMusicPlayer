var youtubeController = (function() {
  var inputHasFocus = false;

  var initialize = function(player) {
    var testInput = $('#testInput');
    var testButton = $('#testButton');

    setFocusAndKeyboardFunctionality();
    var player = player;
    $(testButton).on('click', getAndExecuteQuery);
    testInput.focus();
  }

  function getAndExecuteQuery() {
    var queryString = $(testInput).val();
    executeQuery(queryString).done(playNewVideo)
  }

  function playNewVideo(results) {
    player.loadVideoById({
      'videoId': results.items[0].id.videoId,
      'suggestedQuality': 'large'
    });

    testInput.focus();
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
    $(testInput).on('blur', function(){
      inputHasFocus = false;
    });

    $(document).on('keypress', function(e){
      if(e.which === 13) {
        $(testButton).click();
      }
      if(!inputHasFocus) {
        testInput.focus();
        inputHasFocus = true;
      }
    });
  }

  return {
    initialize: initialize
  }
})();

var youtubeController = function() {

  this.initialize = function() {

    $('#testButton').on('click', function() {
      var queryString = $('#testInput').val();
    
      executeQuery(queryString).done(function(response){
        response.items.forEach(function(item){
          console.log(item);
        });
      });
    });

    $(this).on('testEvent', function() {
      console.log('custom event worked');
    });
  }


  function executeQuery(query) {
    return new Promise(function(resolve, reject){
      var url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBGW3_8YPM9IkIFry4QuisFUgvdK_mgtOA&q=' + query;
      $.ajax({
        type: "GET",
        url: url,
        success: function(results) {
          resolve(results);
        }
      });
    });
  }

  return {
    initialize: self.initialize
  }
}();

$(function() {

  $('#button').on('click', function(){
    player.cueVideoById({videoId: 'ep9Bg_RFEsE'});
  });

  $("#youtube").autocomplete({
    source: function(request, response) {
      /* google geliştirici kimliği (zorunlu değil) */
      var apiKey = 'AI39si7ZLU83bKtKd4MrdzqcjTVI3DK9FvwJR6a4kB_SW_Dbuskit-mEYqskkSsFLxN5DiG1OBzdHzYfW0zXWjxirQKyxJfdkg';
      /* aranacak kelime */
      var query = request.term;
      /* youtube sorgusu */
      $.ajax({
        url: "http://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&hjson=t&cp=1&q=" + query + "&key=" + apiKey + "&format=5&alt=json&callback=?",
        dataType: 'jsonp',
        success: function(data, textStatus, request) {
          response($.map(data[1], function(item) {
            return {
              label: item[0],
              value: item[0]
            }
          }));
        }
      });
    },

    select: function(event, ui) {
      $.youtubeAPI(ui.item.label);
    }
  });

});




var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onYouTubeIframeAPIReady() {

  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'u9MAg9E5K3w',
    playerVars: {
      "enablejsapi": 1,
      "origin": document.domain,
      "rel": 0
    },
    events: {
      "onReady": onPlayerReady,
      "onError": onPlayerError,
      "onStateChange": onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {

  event.target.playVideo();
}

var done = false;

function onPlayerStateChange(event) {
  // video ended
  if(event.data === 0) {
    debugger;
  }
}

function onPlayerError() {

}

function stopVideo() {
  player.stopVideo();
}

console.log('test');

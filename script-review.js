var APIkey = "AIzaSyBXrKVTEqvVe1qrURFMAu7Wja4UXcjeGuU";

var videoID = [];
var playNow = false;

//var pageEl = document.querySelectorAll("#review");
var divDisplayEl = document.querySelector("#displayMovies");


function clearElements(element) {
    if (element.childNodes.length > 0) {         
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
};

function displayResponse(data) {
    clearElements(divDisplayEl);

    for (i = 0; i < data.items.length; i++) {
        let divEl = document.createElement("div");
        divEl.setAttribute("class", "column");

        let newfig = document.createElement("figure");
        newfig.setAttribute("class", "image is-4by3");
    
        let newimg = document.createElement("img");
        newimg.setAttribute("src", data.items[i].snippet.thumbnails.default.url);
        newimg.setAttribute("alt", "Placeholder image");
        newfig.appendChild(newimg);

        divEl.appendChild(newfig);

        divDisplayEl.appendChild(divEl);
        
        videoID[i] = data.items[i].id.videoId;

    }
    playThisVideo(data.items[0].id.videoId);

};

function getyoutube(movieName){
    let APIurl = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=" + movieName + "&type=video&maxResults=3&chart=mostpopular&key=" + APIkey;

    fetch(APIurl)
    .then(function(response){
        if (response.ok){ 
            response.json()
            .then(function(data){
                console.log(data);
                displayResponse(data);               
            });
        } else {
            //displayError("An error has ocurred");
        }
    })
    .catch(function(error){
        //displayError("An error has occurred");
    })
       
};


document.addEventListener('DOMContentLoaded', function() {
    let param = new URLSearchParams(document.location.search);
    let movie = param.get("movie");
    getyoutube(movie);
});


//when click on a youtube-picture
divDisplayEl.addEventListener("click", function(event){
    for (i = 0; i < videoID.length; i++) {
      if ((event.target.src).includes(videoID[i])) {
        playNow = true;
        playThisVideo(videoID[i]);
      }
    }
  
  });
/********************************YOUTUBE-API CODE *********************************/

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.

function onYouTubeIframeAPIReady() {

}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  if (playNow) {
      event.target.playVideo();
      
  }
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        //setTimeout(stopVideo, 6000);
        //done = true;
    }
}
function stopVideo() {
  player.stopVideo();
}

var player;
function playThisVideo(vID) {
    console.log("playthisvideo:" + playNow);
  if (player) {
    player.destroy();
  }
  player = new YT.Player('player', {
    // height: '390',
    // width: '640',    
    height: '600',
    width: '100%',
    videoId: vID,
    playerVars: {
      'playsinline': 1
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}
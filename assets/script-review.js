/* Setting the Global Variables*/

var options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'f91d0897b5msh3f95e544b529b97p113c85jsn6eaab339a9a5',
    'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
  }

};

/*Started the function to call the API and also map the elements*/
function getReview(id) {
  fetch('https://online-movie-database.p.rapidapi.com/title/get-user-reviews?tconst=' + id, options)
    .then(response => response.json())
    .then(data => {

      console.log(data);
      let authorEl = document.getElementById("byAuthor");
      authorEl.textContent = "Review by: " + data.reviews[0].author.displayName;
      let pEl = document.getElementById("titleContainer");
      pEl.textContent = data.base.title;
      const review = data.reviews[0].reviewText;
      let fatherEl = document.querySelector("#synopsis");
      let divEl = document.createElement("div");
      divEl.setAttribute("class", "content");
      let ulEl = document.createElement("ul");
      let reviewEl = document.createElement("li");
      reviewEl.textContent = review;
      ulEl.appendChild(reviewEl);
      divEl.appendChild(ulEl);
      fatherEl.appendChild(divEl);



    })
    .catch(err => console.error(err));
};


/*This function gets the poster and displays it*/

function getPosters(movieName) {

  let movie = movieName.replace(" review", "");
  fetch("https://online-movie-database.p.rapidapi.com/title/find?q=" + movie, options)
    .then(response => response.json())
    .then(data => {
      const list = data.results;
      console.log(data);
      let temp = data.results[0].image.url;
      let imgEl = document.getElementById("posterSource");
      imgEl.src = temp;
      imgEl.width = 1280;
      imgEl.height = 960;

      let id = data.results[0].id;
      id = id.replace("title", "");
      id = id.replaceAll("/", "");

      getReview(id);



    })
    .catch(err => console.error(err));
};

var APIkey = "AIzaSyCne0jK8-8sA1FXdhG2zg6GKLCd8HzPOWc";

var videoID = [];
var playNow = false;

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

function getyoutube(movieName) {
  let APIurl = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=" + movieName + "&type=video&maxResults=3&chart=mostpopular&key=" + APIkey;

  fetch(APIurl)
    .then(function (response) {
      if (response.ok) {
        response.json()
          .then(function (data) {
            console.log(data);
            displayResponse(data);
          });
      } else {
        //displayError("An error has ocurred");
      }
    })
    .catch(function (error) {
      //displayError("An error has occurred");
    })

};


document.addEventListener('DOMContentLoaded', function () {
  let param = new URLSearchParams(document.location.search);
  let movie = param.get("movie");
  getPosters(movie);
  getyoutube(movie);
});


//when click on a youtube-picture
divDisplayEl.addEventListener("click", function (event) {
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










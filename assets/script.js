
var formEl = document.querySelector("#movieForm");
var movieNameEl = document.querySelector("#movieName");

const movieFormSubmit = function(event){
    event.preventDefault();
    
    let movie = (movieNameEl.value.trim() + " review").replaceAll(" ", "%20");

    if (movie != "") {
        window.location.assign("assets/review-page.html?movie=" + movie);
    } else {
        movieNameEl.value = '';
        alert("You must enter a Movie Name");
        movieNameEl.value = '';
        movieNameEl.focus();
    }

};

formEl.addEventListener("submit", movieFormSubmit);

//IMDb/TMDb

const API_KEY= 'api_key=42e3c6821d10b560072b366b2a86a1c4';
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;

const IMG_URL = 'https://image.tmdb.org/t/p/w500'
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const searchURL = BASE_URL + '/search/movie?'+API_KEY;

getMovies(API_URL);

function gerMovies(url) {

    fetch(url).them(res => res.json).then(data =>{
        console.log(data);

        showMovies(data)
    })
}
function showMovies(data) {
main.innerHTML = '';


    data.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie;
        const movieE1 = document.createElement('div');
        movieE1.classList.add('movie');
        movieE1.innerHTML = //'<img src="${IMG_URL+poster_path}" alt="${title}">
        //<div class="movie-info">
        //<h1>${title}
        //span class="${getColor(vote_average)}">${vote_average}</span>
        //</div>
        //<div class="overview">
        //<h1>Overview</h1>
        //$(overview)
        //</div>
        main.appendChild(movieE1);
    })
}
    function getColor(vote) {
        if(vote>=8){
            return 'green'
        }else if(vote >= 5){
            return "orange"
        }else{
            return 'red'
        }
   
}
form.addEventListener('submit', (i) =>{
    i.preventDefault();

    const searchTerm = search.value;

    if(searchTerm) {
        getMovies(searchURL+'&query='+searchTerm)
    }else{
        getMovies(API_URL);
    }
})
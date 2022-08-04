//IMDb/TMDb

var API_KEY= 'api_key=42e3c6821d10b560072b366b2a86a1c4';
var BASE_URL = 'https://api.themoviedb.org/3';
var API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;

var IMG_URL = 'https://image.tmdb.org/t/p/w500';
var main = document.getElementById('main');
var form = document.getElementById('form');
var search = document.getElementById('search');
var searchURL = BASE_URL + '/search/movie?'+API_KEY;

getMovies(API_URL);
//fetch data form url
function getMovies(url) {

    fetch(url).then(res => res.json()).then(data =>{
        console.log(data);

showMovies(data.results);
    })
}
//show data from fetch
function showMovies(data) {
    main.innerHTML = '';
    
    
        data.forEach(movie => {
            
        
            var {title, poster_path, vote_average, overview} = movie;
            var movieE1 = document.createElement('div');
            movieE1.classList.add('movie');
           //overview
            movieE1.innerHTML =`
            <img src="${IMG_URL+poster_path}" alt="${title}">
            
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}
                </span>
            </div>

            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
            `
            main.appendChild(movieE1);
        })
    }
    // voting and reviews
        function getColor(vote) {
            if(vote>=8){
                return 'green'
            }else if(vote >= 5){
                return "orange"
            }else{
                return 'red'
            }
       
    }
    //search value
    form.addEventListener('submit', (i) =>{
        i.preventDefault();
    
        var searchTerm = search.value;
    
        if(searchTerm) {
            getMovies(searchURL+'&query='+searchTerm)
        }else{
            getMovies(API_URL);
        }
    })
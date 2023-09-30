const API_KEY = 'd25525bd-c6e0-4592-a65e-cf58e952d88b'
      API_URL = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1'
      API_URL_SEARCH = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword='

getMovies(API_URL)

async function getMovies(url){
  const resp = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': API_KEY,
    },
  });
  const respData = await resp.json();
  // console.log(respData)
  showMovies(respData)
}

function showMovies(data){
  const moviesEl = document.querySelector('.movies');

  document.querySelector('.movies').innerHTML = ''

  data.films.forEach((movie) => {
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
    <div class="movie-cover-inner">
            <img
            src="${movie.posterUrlPreview}"
            alt="movie_cover"
            class="movie-cover-img">
            <div class="movie-cover-darkened"></div>
        </div>
        <div class="movie-info">
          <div class="movie-title">${movie.nameRu}</div>
          <div class="movie-category">${movie.genres.map(genre => ` ${genre.genre}`)}</div>
          <div class="movie-title">${movie.countries.map(country => ` ${country.country}`)}</div>
          ${movie.rating&&
          `
          <div class="movie-average movie-average-${getClassByRate(movie.rating)}">${movie.rating}</div>
          `
          }
        </div>`;
        moviesEl.appendChild(movieEl);
  });
}

function getClassByRate(vote){
  if (vote >= 7) {
    return 'green'
  }else if (vote >= 5){
    return 'orange'
  }else {
    return 'red'
  }
}

const form = document.querySelector('form')
      search = document.querySelector('.header-search')

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const apiSearchUrl = `${API_URL_SEARCH}${search.value}`
  if (search.value) {
    getMovies(apiSearchUrl)
    search.value ='' //удаляем поисковый запрос
  }
})
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
          <div class=movie-title>${movie.year}</div>
          ${movie.rating !== null && movie.rating !== undefined && movie.rating !== `null` &&
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

//Modal

const modalEl = document.querySelector('.modal');

modalEl.innerHTML = `
  <div class="modal__card">
  <img src="" alt="" class="modal__movie-backdrop">
  <h2>
    <span class="modal__movie-title">title</span>
    <span class="modal__movie-release-year">year</span>
  </h2>
  <ul class="modal__movie-info">
    <div class="loader"></div>
    <li class="modal__movie-genre">genre</li>
    <li class="modal__movie-runtime">runtime</li>
    <li>site: <a href="" class="modal__movie-site"></a></li>
    <li class="modal__movie-overview">overview</li>
  </ul>
  <button type="button" class="modal__btn_close">Close</button>
  </div>
`

const API_KEY = 'd25525bd-c6e0-4592-a65e-cf58e952d88b'
      API_URL = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1'
      API_URL_SEARCH = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword='
      API_FILM_ID = `https://kinopoiskapiunofficial.tech/api/v2.2/films/`

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
        movieEl.addEventListener('click', () => openModal(movie.filmId))
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

async function openModal(id){
  const resp = await fetch(API_FILM_ID + id, {
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': API_KEY,
    },
  });
  const respData = await resp.json();
  modalEl.classList.add('modal--show')
  modalEl.innerHTML = `
  <div class="modal__card">
  <img src="${respData.posterUrl}" alt="" class="modal__movie-backdrop">
  <h2>
    <span class="modal__movie-title">${respData.nameRu}</span>
    <span class="modal__movie-release-year">${respData.year}</span>
  </h2>
  <ul class="modal__movie-info">
    <div class="loader"></div>
    <li class="modal__movie-genre">${respData.genres.map(genre => ` ${genre.genre}`)}</li>
    <li class="modal__movie-runtime">runtime: ${respData.filmLength}</li>
    <li>site: <a href="${respData.webUrl}" class="modal__movie-site">${respData.webUrl}</a></li>
    <li class="modal__movie-overview">${respData.description}</li>
  </ul>
  <button type="button" class="modal__btn_close">Close</button>
  </div>
`
  const btnClose = document.querySelector('.modal__btn_close')
  btnClose.addEventListener('click', () => closeModal())
}

function closeModal(){
  modalEl.classList.remove('modal--show');
}

window.addEventListener('click', (e) => {
  // console.log(e.target)
  if (e.target === modalEl) {
    closeModal()
  }
})

window.addEventListener('keydown', (e) =>{
  // console.log(e.keyCode)
  if (e.keyCode === 27) {
    closeModal()
  }
})
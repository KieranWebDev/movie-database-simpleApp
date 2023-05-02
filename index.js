const apiKey = '10594f76';
let neededMovieData = {};
let watchList = [];
let savedWatchList = [];

const formInput = document.querySelector('#search-query');

async function getGeneralFilmInfo(e) {
  let userQuery = formInput.value;
  console.log(userQuery);

  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${apiKey}&s=${userQuery}&type=movie`
  );
  const data = await response.json();
  const imdbIDarray = data.Search.map((movie) => movie.imdbID);
  userQuery = formInput.value = '';
  return imdbIDarray;
}

async function getDetailedFilmInfo(e) {
  e.preventDefault();
  const ids = await getGeneralFilmInfo();
  console.log(ids);
  neededMovieData = await Promise.all(
    ids.map(async (movieId) => {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`
      );
      const data = await response.json();
      // console.log(data);
      const { Title, imdbRating, Runtime, Genre, Plot, Poster, imdbID } = data;
      const dataToDisplay = {
        Title,
        imdbRating,
        Runtime,
        Genre,
        Plot,
        Poster,
        imdbID,
        wishList: false,
      };
      return dataToDisplay;
    })
  );
  renderHtml(neededMovieData);
}
// console.log(neededMovieData);
// setTimeout(() => {
//   console.log(neededMovieData);
// }, 5000);

function renderHtml(movieData) {
  const htmlToDisplay = movieData
    .map((movie) => {
      return `<div class="movie-card">
    <div class="movie-poster">
        <img src="${movie.Poster}" alt="">
    </div>

    <div class="movie-info-container">
    <div class="title-and-rating">
        <h2>${movie.Title}</h2> <span>⭐ ${movie.imdbRating}</span>
        </div>
        <div class="movie-info">
            <span>${movie.Runtime}</span>
            <span>${movie.Genre}</span>
            <button id="add-to-watchlist-${movie.imdbID}" class="add-to-watchlist"><img src="./imagesAndIcons/add2.png" alt="add-icon">Watchlist</button>
            <button id="remove-from-watchlist-${movie.imdbID}" class="remove-from-watchlist hidden"><img src="./imagesAndIcons/subtract-icon.png" alt="add-icon">Watchlist</button>
      
        </div>

        <p>${movie.Plot}</p>
    </div>
</div>`;
    })
    .join();

  document.querySelector('.search-results-container').innerHTML = htmlToDisplay;

  movieData.forEach((movie) => {
    document
      .querySelector(`#add-to-watchlist-${movie.imdbID}`)
      .addEventListener('click', () => addToWishList(movie));
  });

  movieData.forEach((movie) => {
    document
      .querySelector(`#remove-from-watchlist-${movie.imdbID}`)
      .addEventListener('click', () => removeFromWatchList(movie));
  });

  // console.log(htmlToDisplay);
}
function addToWishList(movie) {
  watchList = [...watchList, movie];
  savedWatchList = localStorage.setItem('watchList', JSON.stringify(watchList));

  document
    .querySelector(`#add-to-watchlist-${movie.imdbID}`)
    .classList.add('hidden');
  document
    .querySelector(`#remove-from-watchlist-${movie.imdbID}`)
    .classList.remove('hidden');
  // console.log(watchList);
  const storedWatchList = localStorage.getItem('watchList');
  const parsedWatchList = storedWatchList ? JSON.parse(storedWatchList) : [];
  console.log('yo', parsedWatchList);
}

function removeFromWatchList(movie) {
  watchList = watchList.filter((item) => item.Title !== movie.Title);
  console.log(watchList);
  document
    .querySelector(`#add-to-watchlist-${movie.imdbID}`)
    .classList.remove('hidden');
  document
    .querySelector(`#remove-from-watchlist-${movie.imdbID}`)
    .classList.add('hidden');

  console.log(parsedWatchList);
}

if (document.querySelector('form')) {
  document
    .querySelector('form')
    .addEventListener('submit', getDetailedFilmInfo);
}

// document
//   .querySelector('watchList-link')
//   .addEventListener('click', renderWatchListHtml);

// function renderWatchListHtml() {
//   console.log('clikced');
//   // document.querySelector('#watch-list)').innerHTML =
// }
// export default watchList;

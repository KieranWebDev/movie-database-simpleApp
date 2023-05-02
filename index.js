const apiKey = '10594f76';
let neededMovieData = {};
let wishList = {};

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
      const { Title, imdbRating, Runtime, Genre, Plot, Poster } = data;
      const dataToDisplay = {
        Title,
        imdbRating,
        Runtime,
        Genre,
        Plot,
        Poster,
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
            <button id="add-to-watchlist" class="add-to-watchlist"><img src="./imagesAndIcons/add2.png" alt="add-icon">Watchlist</button>
        </div>
        <p>${movie.Plot}</p>
    </div>
</div>`;
    })
    .join();

  document.querySelector('.search-results-container').innerHTML = htmlToDisplay;

  console.log(htmlToDisplay);
}

document.querySelector('form').addEventListener('submit', getDetailedFilmInfo);

// function renderSearchResults(movieData) {
//   const htmlToDisplay = movieData.Search.map((movie) => {
//     `<div class="movie-card">
// <div class="movie-poster">
//     <img src="${movie.Poster}" alt="">
// </div>

// <div class="movie-info-container">
// <div class="title-and-rating">
//     <h2>${movie.Title}</h2> <span>⭐ </span>
//     </div>
//     <div class="movie-info">
//         <span>117 min</span>
//         <span>action,Drama,Sci-fi</span>
//         <button id="add-to-watchlist" class="add-to-watchlist"><img src="./imagesAndIcons/add2.png" alt="add-icon">Watchlist</button>
//     </div>
//     <p>A blade runner must pursue and terminate four replicants who stole a ship in space, and have returned to Earth to find their creator.</p>
// </div>
// </div>`;
//   });
// }

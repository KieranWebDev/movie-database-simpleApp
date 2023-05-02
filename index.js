const apiKey = '10594f76';
let neededMovieData = {};
let wishList = {};

const formInput = document.querySelector('#search-query');

async function getGeneralFilmInfo(e) {
  const userQuery = formInput.value;
  console.log(userQuery);

  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${apiKey}&s=star wars&type=movie`
  );
  const data = await response.json();
  const imdbIDarray = data.Search.map((movie) => movie.imdbID);

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
      const { Title, imdbRating, Runtime, Genre, Plot } = data;
      const dataToDisplay = {
        Title,
        imdbRating,
        Runtime,
        Genre,
        Plot,
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
  const htmlToDisplay = movieData.map((movie) => {
    return `<div class="movie-card">
    <div class="movie-poster">
        <img src="./imagesAndIcons/placeholder.png" alt="">
    </div>

    <div class="movie-info-container">
    <div class="title-and-rating">
        <h2>BladeRunner</h2> <span>⭐ 8.1</span>
        </div>
        <div class="movie-info">
            <span>117 min</span>
            <span>action,Drama,Sci-fi</span>
            <button id="add-to-watchlist" class="add-to-watchlist"><img src="./imagesAndIcons/add2.png" alt="add-icon">Watchlist</button>
        </div>
        <p>A blade runner must pursue and terminate four replicants who stole a ship in space, and have returned to Earth to find their creator.</p>
    </div>
</div>`;
  });
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

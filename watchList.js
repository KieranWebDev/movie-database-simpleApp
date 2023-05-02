// import watchList from './index.js';

// console.log(watchList);
// console.log(apiKey);
// Retrieve stored watchList or set it to an empty array
const storedWatchList = localStorage.getItem('watchList');
const parsedWatchList = storedWatchList ? JSON.parse(storedWatchList) : [];

console.log(parsedWatchList);
console.log('hello');

function renderWatchListHtml() {
  let html = parsedWatchList
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
    .join('');
  console.log(html);
  return html;
}

document.querySelector('#watch-list').innerHTML = renderWatchListHtml();

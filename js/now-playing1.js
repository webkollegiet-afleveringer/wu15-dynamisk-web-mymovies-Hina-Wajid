
import { star } from "./svg.js"
const mainDom = document.querySelector(".main-dom");
const imgUrl = 'https://image.tmdb.org/t/p/w200'

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMTZhMjNkOTk5N2UwNTc0MzEwZGVlMThmMDg4MTQzOCIsIm5iZiI6MTc3MzMxMjQ3Ny4xMDYsInN1YiI6IjY5YjI5OWRkZmVjMTI4Y2IzZjRiNmYyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L3AVPyTRfrJWUjFuh9rSUadnus3PKkFhPFKPJ_KckFg'
    }
};

function init() {

    fetch('https://api.themoviedb.org/3/movie/now_playing', options)
        .then(res => res.json())
        .then(res => myMovie(res))
        .catch(err => console.error(err));
}


init();

function myMovie(data) {

    console.log(data);


    const headerString =/* html */`
      <header class="header_styling">
            <h1>MyMovies</h1>
            <label class="toggleswitch">
                <input class="input_toggle" type="checkbox" id="input_toggle">
                <div class="toggleswitch__base">
                    <div class="toggleswitch__toggle"></div>
                </div>

            </label>
        </header>
   `
    mainDom.insertAdjacentHTML("beforeend", headerString);


    const nowShowingString =

        data.results.map((result) => {
            const { title, poster_path, original_title, vote_average } = result;

            return /* html */`
            <section class = "now-showing">
            <div class = "div__headline">
                <h2 class="headline">Now Showing</h2>
                <p class="pill__see-more">See More</p>
            </div>
            <div class="movie-card">
                <figure>
          <img src="https://image.tmdb.org/t/p/w200${poster_path}" alt="${title}">
                <figcaption>
                <h3 class="movie-title">${original_title}</h3>
               ${star} <p class="movie-rating">${vote_average}</p>
                </figure>
                </div>
                </section>
                `
        }).join("")


    mainDom.insertAdjacentHTML("beforeend", nowShowingString);
}

// ${}

// <img src="<img src="${imgUrl}${poster_path} alt="${title}">

// https://image.tmdb.org/t/p/w200
// https://image.tmdb.org/t/p/w200/rFhKkXhk7ClU03jQ5rHIApJDwev.jpg
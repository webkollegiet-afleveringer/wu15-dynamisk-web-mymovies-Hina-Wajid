
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

let movie_id;



async function init() {


    const [playing, popular, genre, movie_info] = await Promise.all([
        fetch('https://api.themoviedb.org/3/movie/now_playing', options)
            .then(r => r.json()),
        fetch('https://api.themoviedb.org/3/movie/popular', options)
            .then(response => response.json()),
        fetch('https://api.themoviedb.org/3/genre/movie/list', options)
            .then(res_genre => res_genre.json()),
        fetch('https://api.themoviedb.org/3/movie/934433', options)
            .then(res_info => res_info.json())
    ]);

    myMovie(playing, popular, genre, movie_info);
}




init();

function myMovie(data, popular, genre, movie_info) {

    // console.log(movie_info.genres[0].name);


    // console.log(popular.results[0].genre_ids[0]);

    const popular_genre_id = popular.results.map(element => {

        return element.genre_ids;

    });
    console.log(data);
    console.log(data.results[0].id);
    movie_id = JSON.parse(data.results[0].id);
    console.log(movie_id);


    // console.log(popular_genre_id);
    // console.log(genre.genres[1].name);


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


    const nowShowingString =/* html */`
        <div class="div__headline">
            <h2 class="headline">Now Showing</h2>
            <p class="pill__see-more">See More</p>
        </div> 
         <ul class="movie-card">
    ${data.results.map((result) => {
        const { title, poster_path, original_title, vote_average } = result;

        return /* html */`
        

           
                <li>
                    <img src="https://image.tmdb.org/t/p/w200${poster_path}" alt="${title}">
                        <h3 class="movie-title">${original_title}</h3>

                        ${star}<p class="movie-rating">${vote_average}</p>
                </li>
           
         
        `
    }).join("")}
     </ul>`


    mainDom.insertAdjacentHTML("beforeend", nowShowingString);
}
function fetchUrl(movie_id) {
    fetch(`https://api.themoviedb.org/3/movie/${movie_id}`, options)
        .then(r => r.json())
        .then(r => console.log(r))

}
// ${}

// <img src="<img src="${imgUrl}${poster_path} alt="${title}">

// https://image.tmdb.org/t/p/w200
// https://image.tmdb.org/t/p/w200/rFhKkXhk7ClU03jQ5rHIApJDwev.jpg
/* 
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMTZhMjNkOTk5N2UwNTc0MzEwZGVlMThmMDg4MTQzOCIsIm5iZiI6MTc3MzMxMjQ3Ny4xMDYsInN1YiI6IjY5YjI5OWRkZmVjMTI4Y2IzZjRiNmYyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L3AVPyTRfrJWUjFuh9rSUadnus3PKkFhPFKPJ_KckFg'
  }
};

fetch('https://api.themoviedb.org/3/discover/movie', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err)); */
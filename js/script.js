
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
let popularMovieInfo;

async function init() {
    const [playing, popular] = await Promise.all([
        fetch('https://api.themoviedb.org/3/movie/now_playing', options)
            .then(r => r.json()),
        fetch('https://api.themoviedb.org/3/movie/popular', options)
            .then(response => response.json()),

    ]);

    myMovie(playing, popular);
}

init();

async function fetchUrl(movie_id) {
    return fetch(`https://api.themoviedb.org/3/movie/${movie_id}`, options)
        .then(r => r.json())


}


async function myMovie(playing, popular) {


    const popular_id = popular.results.map(element => {
        return element.id;
    });
    // console.log(popular_id);

    popularMovieInfo = await Promise.all(popular_id.map(((id) => {
        return fetchUrl(id);
    })));

    /* console.log(popularMovieInfo);
    console.log(popularMovieInfo[0].genres);
    console.log(popularMovieInfo[0].genres[0]);
    console.log(popularMovieInfo[0].genres[0].name); */


    const headerString =/* html */`
            <header class="header_styling">
            <h1><a href="index.html">MyMovies</a></h1>
            <label class="toggleswitch">
                <input class="input_toggle" type="checkbox" id="input_toggle">
                <div class="toggleswitch__base">
                    <div class="toggleswitch__toggle"></div>
                </div>

            </label>
        </header >
        `
    mainDom.insertAdjacentHTML("beforeend", headerString);


    const nowShowingString =/* html */`
        <div class="div__headline">
            <h2 class="headline">Now Showing</h2>
              <a class="pill__see-more" href="moviedetails.html">See More</a>
         
        </div >
        <ul class="movie-card">
            ${playing.results.map((result) => {
        const { title, id, poster_path, original_title, vote_average } = result;

        return /* html */` 
        <a class="movie-card_link" href='details.html?id=${id}'>
                <li>
                    <img src="https://image.tmdb.org/t/p/w200${poster_path}" alt="${title}">
                    <h3 class="movie-title">${original_title}</h3>
                    <div>
                    ${star}<p class="movie-rating">${vote_average}</p>
                    </div>
                    </a> 
                </li>
        `
    }).join("")}
        </ul>`


    mainDom.insertAdjacentHTML("beforeend", nowShowingString);

    console.log(popularMovieInfo);


    const popularMovieString = popularMovieInfo.map((element) => {

        const { id, title, genres, runtime, poster_path } = element;
        return /* html */ ` 
        <section class ="section__popular">
        <figure><img src="https://image.tmdb.org/t/p/w200${poster_path}" alt="${title}"> </figure>
      </div>
       <div><a href='details.html?id=${id}'><h2>${title}</h2></a>
        ${genres
                .map((entry) => {
                    return `<p>${entry.name}</p>`;
                })
                .join("")}
                </div>
                </section>
                
  `
    }).join("");

    mainDom.insertAdjacentHTML("beforeend", popularMovieString);


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


/* const popular_genre_id = popular.results.map(element => {

     return element.genre_ids;

 });
  const popular_genre_id = popular.results.map(element => {

     return element.genre_ids;

 }); */
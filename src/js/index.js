import '@babel/polyfill';

import '../style/styles.scss'; // styles

const API_KEY = '40324148';
const assignment1Btn = document.querySelector('.assignment1-send-btn'); // #1 assignments button
const assignment2Btn = document.querySelector('.assignment2-send-btn'); // #2 assignments button

// #1 assignment
async function getMovieInfo(title, key) {
  // DOM elements
  const movieTitleElement = document.querySelector('.movie-title');
  const movieYearElement = document.querySelector('.movie-year');
  const movieActorsElement = document.querySelector('.movie-actors');
  const currencyElement = document.querySelector('.currency');
  const flagElement = document.querySelector('.flag');
  currencyElement.innerHTML = 'Currency: ';
  flagElement.innerHTML = 'Flags: ';
  if (title === '') return alert('Enter movie name');
  const response = await fetch(`http://www.omdbapi.com/?t=${title}&apikey=${key}`);
  const data = await response.json();
  const responseStatus = data.Response;
  if (responseStatus === 'False') return alert('Please, enter the correct name of the movie');
  // Movies info
  const movieTitle = data.Title;
  const actors = data.Actors;
  const year = new Date().getFullYear() - data.Year;
  const movieCountries = data.Country.split(',');

  movieCountries.forEach(async (country) => {
    const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    const [countryInfo] = await response.json();
    // Added in index.html
    currencyElement.innerHTML += `${Object.keys(countryInfo.currencies)}    `;
    flagElement.innerHTML += `<img src="https://flagpedia.net/data/flags/icon/36x27/${countryInfo.cca2.toLowerCase()}.png" />       `;
  });

  // Added in index.html
  movieTitleElement.textContent = `Movie title: ${movieTitle}`;
  movieYearElement.textContent = `The film was released ${
    year !== 0 ? year + ' years ago' : new Date().getFullYear
  }`;
  movieActorsElement.textContent = `Actors: ${actors
    .split(',')
    .map((actor) => actor.trim().split(' ')[0])
    .join(', ')}`;
}

assignment1Btn.addEventListener('click', () => {
  const movieInputElement = document.querySelector('#movie-input');

  getMovieInfo(movieInputElement.value.trim(), API_KEY);
});

// #2 assignment
async function calculateMovies(titleArr, key) {
  //DOM elements
  const minutesELements = document.querySelector('.movies-minutes');
  const populationBlock = document.querySelector('.countries-population');
  //
  const titles = titleArr.map((el) => el.value);
  const countries = [];
  let moviesMinutes = 0;
  let countriesPopulation = 0;
  titles.forEach(async (title) => {
    const response = await fetch(`http://www.omdbapi.com/?t=${title}&apikey=${key}`);
    const { Runtime, Country } = await response.json();
    moviesMinutes += parseInt(Runtime);
    minutesELements.textContent = `Minutes: ${moviesMinutes}`;
    countries.push(...Country.split(','));
  });

  countries.forEach(async (country) => {
    const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    const data = await response.json();
    console.log(data);
    const { population } = await countryInfo;
    countriesPopulation += population;
    populationBlock.textContent = `Population: ${countriesPopulation}`;
  });
}

assignment2Btn.addEventListener('click', () => {
  const titles = Array.from(document.querySelectorAll('.movie-input'));
  calculateMovies(titles, API_KEY);
});

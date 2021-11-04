import './sass/main.scss';
import './notification';
import { alert, info, error } from '@pnotify/core';
import countries from '../countries-backend.json';
import debounce from 'lodash.debounce';

const galleryRef = document.querySelector('.js-gallery');
const searchFormRef = document.querySelector('.search-form');

searchFormRef.addEventListener('input', debounce(countrySearch, 500));
galleryRef.addEventListener('click', ащддщцCountryByLink);

function countrySearch(event) {
  event.preventDefault();
  clearArticles();
  const searchQuery = event.target.value;

  const findedCountries = countries.filter(country => {
    const name = country.name.toLowerCase().includes(searchQuery.toLowerCase());
    const alpha2Code = country.alpha2Code.toLowerCase().includes(searchQuery.toLowerCase());
    const alpha3Code = country.alpha3Code.toLowerCase().includes(searchQuery.toLowerCase());

    return name || alpha2Code || alpha3Code;
  });

  if (findedCountries.length === 1) {
    updateGalleryMarkupOneCountries(findedCountries);
    console.log(findedCountries);
    info('Coutry found');
    return;
  }
  if (findedCountries.length < 10) {
    updateGalleryMarkupAllCountries(findedCountries);
    alert(`Found ${findedCountries.length} countries`);
    return;
  }
  if (findedCountries.length >= 10) {
    error('Too many matches found. Please enter a more specific query!');
  }
}

function updateGalleryMarkupOneCountries(countries) {
  clearArticles();
  const markup = countries
    .map(country => {
      const languages = country.altSpellings
        .map(country => `<li class="languages-item">${country}</li>`)
        .join('');
      return `<li class="gallety-item">
    <h1 class="gallery-title">${country.name}</h1>
    <div class="country-info">
    <div class="main-info">
    <p class="gallery-text"> <b> Capital: </b>${country.capital}</p>
    <p class="gallery-text"> <b> Population: </b>${country.population}</p>
    <p class="gallery-text"> <b> ${
      country.altSpellings.length === 1 ? 'language: ' : 'languages: '
    } </b></p>
    <ul class="language-list>
    ${languages}
    </ul>
    </div>
    <img class="gallery-img" width="500" height="150" src=" ${country.flags[1]}">
    <div/>
    </li>`;
    })
    .join('');
  galleryRef.insertAdjacentHTML('beforeend', markup);
}

function updateGalleryMarkupAllCountries(countries) {
  const markup = countries
    .map(
      country => `<li class="gallety-item-countries">
    
    <a class="gallery-link">${country.name}</a>
    
    </li>`,
    )
    .join('');
  galleryRef.insertAdjacentHTML('beforeend', markup);
}
function clearArticles() {
  galleryRef.innerHTML = '';
}

function ащддщцCountryByLink(event) {
  event.preventDefault();
  const target = event.target;
  if (target.nodeName !== 'A') return;

  if (target.textContent) {
    const choosedCountry = countries.filter(country => {
      const name = country.name.toLowerCase().includes(target.textContent.toLowerCase());
      const alpha2Code = country.alpha2Code
        .toLowerCase()
        .includes(target.textContent.toLowerCase());
      const alpha3Code = country.alpha3Code
        .toLowerCase()
        .includes(target.textContent.toLowerCase());

      return name || alpha2Code || alpha3Code;
    });
    updateGalleryMarkupOneCountries(choosedCountry);
  }
}

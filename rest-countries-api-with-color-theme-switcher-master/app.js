const countriesList = document.querySelector('.countries-list');
const themeToggle = document.querySelector('.theme-toggle');

// Fetch data from API
async function fetchCountries() {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();
    return data;
}

// Render countries list
function renderCountries(countries) {
    countries.forEach((country) => {
        const countryHTML = `
            <div class="country">
                <h2>${country.name.common}</h2>
                <p>Capital: ${country.capital}</p>
                <p>Population: ${country.population}</p>
  <img src="${country.flags.png}" alt="${country.name.common} flag">
            </div>
        `;
        countriesList.insertAdjacentHTML('beforeend', countryHTML);
    });
}

// Fetch and render countries data
fetchCountries().then((data) => renderCountries(data));

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});


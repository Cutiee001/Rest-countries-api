const countriesGrid = document.getElementById("countries-grid");
const searchInput = document.getElementById("search");
const regionFilter = document.getElementById("region-filter");
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const modal = document.getElementById("country-modal");
const modalDetails = document.getElementById("modal-details");
const closeModal = document.getElementById("close-modal");

const API_URL = "https://restcountries.com/v3.1/all";

// Fetch countries and display them
async function fetchCountries() {
    const response = await fetch(API_URL);
    const countries = await response.json();
    displayCountries(countries);
}

// Display country cards
function displayCountries(countries) {
    countriesGrid.innerHTML = "";
    countries.forEach(country => {
        const card = document.createElement("div");
        card.classList.add("country-card");
        card.innerHTML = `
            <img src="${country.flags.svg}" alt="${country.name.common}">
            <h3>${country.name.common}</h3>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
        `;
        card.addEventListener("click", () => showCountryDetails(country));
        countriesGrid.appendChild(card);
    });
}

// Search country
searchInput.addEventListener("input", (e) => {
    const searchValue = e.target.value.toLowerCase();
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            const filtered = data.filter(country =>
                country.name.common.toLowerCase().includes(searchValue)
            );
            displayCountries(filtered);
        });
});

// Filter by region
regionFilter.addEventListener("change", (e) => {
    const region = e.target.value;
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            const filtered = region ? data.filter(country => country.region === region) : data;
            displayCountries(filtered);
        });
});

// Dark Mode Toggle
themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    themeToggle.textContent = body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// Show country details (modal)
function showCountryDetails(country) {
    modal.classList.remove("hidden");
    modalDetails.innerHTML = `
        <h2>${country.name.common}</h2>
        <img src="${country.flags.svg}" alt="${country.name.common}">
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
    `;
}

// Close modal
closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
});

// Load countries on page load
fetchCountries();

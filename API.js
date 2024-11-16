const apiKey = '5b6066966158ab99c68571cb37fff2f4'; // Replace with your OpenWeatherMap API key

// DOM Elements
const searchButton = document.getElementById('search-btn');
const locationInput = document.getElementById('location');
const getLocationButton = document.getElementById('get-location-btn');
const weatherContainer = document.getElementById('weather-container');
const forecastContainer = document.getElementById('forecast-container');
const dropdownButton = document.getElementById('dropdown-btn');
const dropdownMenu = document.getElementById('dropdown-menu');

// Event Listeners
searchButton.addEventListener('click', () => searchWeather(locationInput.value));
getLocationButton.addEventListener('click', getLocationWeather);
dropdownButton.addEventListener('click', toggleDropdown);

// Fetch weather for a given location
async function searchWeather(location) {
    if (!location) {
        alert("Please enter a location.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Location not found.");
        const data = await response.json();
        displayWeather(data);
        storeRecentSearch(location);
        fetchForecast(location);
    } catch (error) {
        alert(error.message);
    }
}

// Get weather based on current geolocation
async function getLocationWeather() {
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by this browser.");
        return;
    }

    navigator.geolocation.getCurrentPosition(async position => {
        const { latitude, longitude } = position.coords;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            displayWeather(data);
            storeRecentSearch(data.name);
            fetchForecast(data.name);
        } catch (error) {
            alert("Unable to retrieve weather for your location.");
        }
    });
}

// Display current weather data
function displayWeather(data) {
    weatherContainer.innerHTML = `
        <h2 class="text-2xl font-bold">${data.name}, ${data.sys.country}</h2>
        <p class="text-lg">${data.weather[0].description}</p>
        <p class="text-4xl font-semibold">${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

// Fetch extended weather forecast (5-day forecast)
async function fetchForecast(location) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.error("Error fetching forecast:", error);
    }
}

// Display extended weather forecast
function displayForecast(data) {
    forecastContainer.classList.remove('hidden');
    forecastContainer.innerHTML = '';
    data.list.forEach((item, index) => {
        if (index % 8 === 0) { // 8 data points per day, so take 1 point for each day
            forecastContainer.innerHTML += `
                <div class="bg-gray-100 p-4 rounded-lg text-center">
                    <p class="font-semibold">${new Date(item.dt_txt).toLocaleDateString()}</p>
                    <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" alt="${item.weather[0].description}">
                    <p>${item.main.temp}°C</p>
                    <p>Wind: ${item.wind.speed} m/s</p>
                    <p>Humidity: ${item.main.humidity}%</p>
                </div>
            `;
        }
    });
}

// Store recent searches in localStorage
function storeRecentSearch(city) {
    let recentCities = JSON.parse(localStorage.getItem('recentCities')) || [];
    if (!recentCities.includes(city)) {
        recentCities.unshift(city); // Add to the beginning of the array
        if (recentCities.length > 5) recentCities.pop(); // Limit to 5 recent searches
        localStorage.setItem('recentCities', JSON.stringify(recentCities));
    }
    updateDropdown();
}

// Update the dropdown with recent searches
function updateDropdown() {
    const recentCities = JSON.parse(localStorage.getItem('recentCities')) || [];
    dropdownMenu.innerHTML = '';
    recentCities.forEach(city => {
        const li = document.createElement('li');
        li.classList.add('p-2', 'cursor-pointer');
        li.textContent = city;
        li.addEventListener('click', () => searchWeather(city));
        dropdownMenu.appendChild(li);
    });
}

// Toggle dropdown visibility
function toggleDropdown() {
    dropdownMenu.classList.toggle('hidden');
}

// Initialize dropdown with recent searches
updateDropdown();

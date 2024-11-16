# Whether_APP

HTML code 

1. HTML Structure:
<head> Section:

Sets the character encoding to UTF-8 and ensures the webpage is mobile-responsive using viewport settings.
Links to an external CSS file (output.css) that holds Tailwind styles.
Contains custom styles (animations) in the <style> block.
<body> Section:

The background color of the body is set to a light blue (bg-blue-100), with the content centered both horizontally and vertically (flex justify-center items-center min-h-screen).
Main content includes:

Weather Forecast Header: A title that says "Weather Forecast".

Location Input:

An input field where the user can type in a location (city name or area) to search for its weather.
A Search button to trigger the weather search when clicked.
Use My Location Button:

This button will get the user's current geolocation (latitude and longitude) and fetch the weather for that location.
Recently Searched Cities Dropdown:

A dropdown that shows a list of cities the user has searched for previously, stored in the browser's local storage.
When clicked, a city from the dropdown will trigger a new weather search for that city.
Weather Data:

Displays the current weather information for the searched location (like temperature, description, wind speed, and humidity).
Extended Forecast:

Displays a 5-day weather forecast. The forecast data will be shown in a grid format, depending on screen size (e.g., 1 column on mobile, up to 5 columns on large screens).
2. Tailwind CSS Classes:
Tailwind Utility Classes are used throughout the HTML to style the elements:
bg-white, p-8, rounded-xl, shadow-lg, etc., are used to style the containers, buttons, inputs, etc., with Tailwind's pre-defined classes.
flex, justify-center, items-center, min-h-screen, etc., are used for layout and positioning.
hover:bg-blue-600, focus:outline-none, etc., provide hover/focus states and smooth transitions.
3. Custom CSS (Animations):
Fade-In Animation:

This animation (fadeIn) makes elements gradually appear by fading them in and sliding them up a little. It is applied to elements like the weather data and the forecast container.
It’s applied by adding the class fade-in to an element.
Slide-In Animation:

This animation (slideIn) is applied to the dropdown menu. When the user clicks on the "Recent Searches" button, the menu slides in smoothly from the top, becoming visible.
It’s applied by adding the class slide-in to the dropdown menu.
4. JavaScript File (API.js):
The JavaScript file (API.js) contains the logic for fetching weather data:
It makes API calls to OpenWeatherMap API to get the current weather and forecast data based on the user's input or location.
The data is dynamically displayed in the respective sections (weather-container and forecast-container).
The script also handles storing and retrieving recently searched cities in localStorage.

2. JS CODE

3. Variables and DOM Elements:
DOM Elements: These are references to various HTML elements (buttons, containers) in the app. They will be used to interact with the page, such as displaying weather data or handling user clicks.
Event Listeners:
searchButton.addEventListener('click', ...): Triggers the weather search when the user clicks the Search button.
getLocationButton.addEventListener('click', ...): Triggers fetching weather based on the user's current location when they click the Use My Location button.
dropdownButton.addEventListener('click', ...): Toggles the visibility of the dropdown with recently searched cities when clicked.
Functions:
searchWeather(location):

This function takes a location (city name), makes an API request to OpenWeatherMap, and fetches the current weather for that location.
If the location is found, it displays the weather data using the displayWeather() function and stores the city in localStorage for future use.
getLocationWeather():

Uses the browser's Geolocation API to get the user's current location (latitude and longitude).
Displays the weather and stores the location as a recent search.
displayWeather(data):

Displays the current weather for a given location (name, description, temperature, humidity, wind speed) in the app.
fetchForecast(location):

Fetches a 5-day weather forecast for a given location by making an API request.

Displays the 5-day forecast data, including date, temperature, wind speed, humidity, and weather icons, for each day.
The forecast is shown in a grid layout.
storeRecentSearch(city):

Stores the most recent cities searched by the user in the localStorage to persist recent searches between page reloads.
It only keeps the latest 5 cities.
updateDropdown():

Updates the dropdown menu with the most recent cities stored in localStorage.


updateDropdown() (initial call):

This is called when the page loads to initialize the dropdown with the most recent cities from localStorage.

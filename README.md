# Lab4_ITMD541
This web application provides sunrise, sunset, dawn, dusk, day length, solar noon, and time zone information for any given location. Users can search by city name or use their current geolocation. 


# Sunrise Sunset Dashboard
# Description
The Sunrise Sunset Dashboard is a web application that provides users with detailed information about sunrise, sunset, dawn, dusk, day length, solar noon, and the relevant time zone for a given location. The application offers two primary features: searching by city name and using the user's current geolocation.

# Features
City Name Search: Users can enter the name of a city to retrieve sunrise and sunset information. The application uses geocode.maps.co to convert the city name into geographical coordinates (latitude and longitude).

# Geolocation Feature: 
Users can also opt to use their current location by clicking the "Use My Location" button. This feature utilizes the browser's Geolocation API to fetch the user's current latitude and longitude.

# Sunrise and Sunset Data: 
For both today and tomorrow, the dashboard displays:

Sunrise and Sunset times
Dawn and Dusk times
Day Length
Solar Noon
Time Zone

# Responsive Design: 
The layout is responsive, making the application suitable for various devices and screen sizes.

# Error Handling: 
The application includes error handling for both the Geolocation API and the sunrise/sunset API, providing user-friendly alerts in case of issues like permission denial or unavailable location data.

# Technologies Used
HTML
CSS
JavaScript
External APIs (geocode.maps.co and api.sunrisesunset.io)

# Setup and Usage
Clone the repository.
Open index.html in a web browser.
Enter a city name or use the "Use My Location" button to fetch sunrise and sunset data.

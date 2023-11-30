function getGeoData() {
    const searchElement = document.getElementById('searchbar').value;

    if (!searchElement.trim()) {
        alert("Please enter a city name.");
        return;
    }

    const url = `https://geocode.maps.co/search?q=${encodeURIComponent(searchElement)}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                alert("Invalid city name.");
                document.getElementById('searchbar').value = "";
                return;
            }

            const lat = data[0].lat;
            const lon = data[0].lon;
            fetchSunriseSunsetData(lat, lon);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error fetching location data. Please try again.');
        });
}

function fetchSunriseSunsetData(lat, lon) {
    const today = formatDate(new Date());
    const tomorrow = formatDate(new Date(new Date().setDate(new Date().getDate() + 1)));

    fetchSunriseSunsetAPI(lat, lon, today, 'Today');
    fetchSunriseSunsetAPI(lat, lon, tomorrow, 'Tomorrow');
}

function fetchSunriseSunsetAPI(lat, lon, date, dayIdentifier) {
    const url = `https://api.sunrisesunset.io/json?lat=${lat}&lng=${lon}&date=${date}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.status !== 'OK') {
                throw new Error('Error in API response');
            }
            updateDashboard(data.results, dayIdentifier);
        })
        .catch(error => {
            console.error('Error:', error);
            alert(`Error fetching sunrise/sunset data for ${dayIdentifier}. Please try again.`);
        });
}
function updateDashboard(data, dayIdentifier) {
    document.querySelector(`#${dayIdentifier} .date`).innerHTML = formatDate(new Date());
    document.querySelector(`#${dayIdentifier} .sunrise`).innerHTML = data.sunrise;
    document.querySelector(`#${dayIdentifier} .sunset`).innerHTML = data.sunset;
    document.querySelector(`#${dayIdentifier} .dawn`).innerHTML = data.dawn;
    document.querySelector(`#${dayIdentifier} .dusk`).innerHTML = data.dusk;
    document.querySelector(`#${dayIdentifier} .daylength`).innerHTML = data.day_length;
    document.querySelector(`#${dayIdentifier} .solarnoon`).innerHTML = data.solar_noon;
    document.querySelector(`#${dayIdentifier} .timezone`).innerHTML = data.timezone;
}

function formatDate(date) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return `${daysOfWeek[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(fetchDataWithGeolocation, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
document.addEventListener('DOMContentLoaded', (event) => {
    const locationButton = document.getElementById('locationButton');
    if (locationButton) {
        locationButton.addEventListener('click', getUserLocation);
    }
});

function fetchDataWithGeolocation(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    fetchSunriseSunsetData(lat, lon);
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

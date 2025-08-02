// A toi de jouer pour cette partie :-) Happy coding !

const cityInput = document.getElementById("cityInput");
const button = document.querySelector(".city-search button");
const cityTitle = document.getElementById("city");
const gpsDiv = document.getElementById("gps");
const temperatureDiv = document.getElementById("temperature");
const detailsDiv = document.getElementById("details");

button.addEventListener("click", () => {
    detailsDiv.textContent = "Mise à jour en cours...";
    fetchCoordinates();
})

async function fetchCoordinates() {
    const city = cityInput.value.trim();

    if (!city) {
        cityTitle.textContent = "Entrez un nom de ville";
        gpsDiv.textContent = "";
        return;
    }

    try {
        const responseCoordinates = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&addressdetails=1&limit=1`);

        if (!responseCoordinates.ok)
            throw new Error("Erreur lors de la récupération des données");

        const datacoordinates = await responseCoordinates.json();

        if (datacoordinates.length === 0) {
            cityTitle.textContent = "Aucune ville trouvée";
            gpsDiv.textContent = "";
            temperatureDiv.textContent = "";
            detailsDiv.textContent = "Vérifiez le nom de la ville";
            return;
        }

        const { lat, lon, display_name } = datacoordinates[0];

        cityTitle.textContent = display_name;
        gpsDiv.textContent = `Coordonnées GPS: ${ lat },${ lon }`;
        fetchWeather(lon, lat);

    } catch (error) {
        console.error("Erreur :", error);
        cityTitle.textContent = "Erreur lors de la recherche";
        gpsDiv.textContent = "";
        temperatureDiv.textContent = "";
    }

}


async function fetchWeather(lon, lat) {
    try {
        const responseTemperature = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,precipitation,relative_humidity_2m`);
        if (!responseTemperature.ok)
            throw new Error("Erreur lors de la récupération des données");
        const dataTemperature = await responseTemperature.json();
        const temperature = dataTemperature.current.temperature_2m
        temperatureDiv.textContent = temperature
        detailsDiv.textContent = "Température actuelle"

    } catch (error) {
        console.error("Erreur :", error);
        temperatureDiv.textContent = "Impossible d'afficher la température";
        detailsDiv.textContent = "Erreur lors de la recherche";
    }
}

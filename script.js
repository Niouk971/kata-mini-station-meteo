// A toi de jouer pour cette partie :-) Happy coding !

async function getCoordinates() {

    try {

        const response = await fetch("https://nominatim.openstreetmap.org/search?q=Paris&format=json&addressdetails=1&limit=1");

        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }
        const data = await response.json();


        console.log(data);

        // console.log(data[0].lat);


    } catch (error) {
        console.log(error.message);
    }

}

getCoordinates();

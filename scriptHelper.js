// Write your helper functions here!

require('cross-fetch/polyfill');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // Here is the HTML formatting for our mission target div.
    /*
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: </li>
                     <li>Diameter: </li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: </li>
                     <li>Number of Moons: </li>
                 </ol>
                 <img src="">
    */

    let mission = document.getElementById("missionTarget");
    mission.innerHTML = `
        <h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name}</li>
            <li>Diameter: ${diameter}</li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance}</li>
            <li>Number of Moons: ${moons}</li>
        </ol>
        <img src="${imageUrl}">
    `
}

function validateInput(testInput) {
    return (testInput === "") ? "Empty" :
        (isNaN(testInput)) ? "Not a Number" : "Is a Number";
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let launchStatus = document.querySelector("h2[id=launchStatus]");
    let pilotStatus = list.querySelector("li[id=pilotStatus]");
    let copilotStatus = list.querySelector("li[id=copilotStatus]");
    let fuelStatus = list.querySelector("li[id=fuelStatus]");
    let cargoStatus = list.querySelector("li[id=cargoStatus]");
    
    list.style.visibility = 'visible';
    pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;

    if (validateInput(pilot) !== "Not a Number" || validateInput(copilot) !== "Not a Number" || validateInput(fuelLevel) !== "Is a Number" || validateInput(cargoLevel) !== "Is a Number" || Number(fuelLevel) < 0 || Number(cargoLevel) < 0 || isNaN(fuelLevel) || isNaN(cargoLevel)) {
        alert("Please enter valid information.");
        list.style.visibility = 'hidden';
        // launchStatus.innerHTML = "Awaiting Information Before Launch";
    } else if (Number(fuelLevel) < 10000 || Number(cargoLevel) > 10000) {
        launchStatus.style.color = "red";
        launchStatus.innerHTML = "Shuttle Not Ready for Launch";
    }

    if (Number(fuelLevel) < 10000) {
        fuelStatus.innerHTML = `Fuel level too low for launch`;
    } else {
        fuelStatus.innerHTML = `Fuel level high enough for launch`;
    }
    
    if (Number(cargoLevel) > 10000) {
        cargoStatus.innerHTML = `Cargo mass too heavy for launch`;
    } else {
        cargoStatus.innerHTML = `Cargo mass low enough for launch`;
    }

    if (Number(fuelLevel) >= 10000 && Number(cargoLevel) <= 10000) {
        launchStatus.style.color = "green";
        launchStatus.innerHTML = "Shuttle is Ready for Launch";
        fuelStatus.innerHTML = `Fuel level high enough for launch`;
        cargoStatus.innerHTML = `Cargo mass low enough for launch`;
    }
}

async function myFetch() {
    // let planetsReturned;

    // planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
    //     response.json();
    // });

    let response = await fetch("https://handlers.education.launchcode.org/static/planets.json");
    let planetsReturned = await response.json();

    return planetsReturned;
}

function pickPlanet(planets) {
    let index = Math.floor(Math.random() * planets.length);
    return planets[index];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
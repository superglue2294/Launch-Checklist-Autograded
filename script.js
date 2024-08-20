// Write your JavaScript code here!
// const { formSubmission } = require("./scriptHelper");

window.addEventListener("load", function () {
    
    
    let listedPlanets;
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch();
    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        // console.log(listedPlanets);
    }).then(function () {
        // console.log(listedPlanets);
        // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
        let randomPlanet = pickPlanet(listedPlanets);
        addDestinationInfo(document, randomPlanet.name, randomPlanet.diameter, randomPlanet.star, randomPlanet.distance, randomPlanet.moons, randomPlanet.image);
    })
    
    let list = document.getElementById("faultyItems");
    let pilot = document.querySelector("input[name=pilotName]");
    let copilot = document.querySelector("input[name=copilotName]");
    let fuelLevel = document.querySelector("input[name=fuelLevel]");
    let cargoLevel = document.querySelector("input[name=cargoMass]");
    
    // formSubmission(document, list, "Chris", "Bob", 0, 5);
    let form = document.querySelector("form");
    form.addEventListener("submit", e => {
        e.preventDefault();
        formSubmission(this.document, list, pilot.value, copilot.value, fuelLevel.value, cargoLevel.value);
    })
});
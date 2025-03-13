const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("searchInput");
const resetButton = document.getElementById("reset-button");
const searchResults = document.getElementById("search-results");

let travelHubData = [];

// Fetch data from the JSON file
fetch("travel_hub_api.json")
    .then(response => response.json())
    .then(data => {
        travelHubData = data;
        console.log("Get Request Result", data);
    })
    .catch(error => console.log("Error", error));

// Function to search the travel hub data
function searchTravelHub() {
    console.log("searchTravelHub function called");

    const searchValue = searchInput.value.toLowerCase();
    let filteredResults = [];

    console.log("Search Value:", searchValue);

    if (searchValue.includes("beach")) {
        console.log("Searching for beaches");
        // Search through beaches
        travelHubData.beaches.forEach(beach => {
            filteredResults.push({
                title: beach.name,
                description: beach.description,
                imageUrl: beach.imageUrl
            });
        });
    } else if (searchValue.includes("temple")) {
        console.log("Searching for temples");
        // Search through temples
        travelHubData.temples.forEach(temple => {
            filteredResults.push({
                title: temple.name,
                description: temple.description,
                imageUrl: temple.imageUrl
            });
        });
    } else {
        console.log("Searching for countries and cities");
        // Search through countries and their cities
        travelHubData.countries.forEach(country => {
            if (country.name.toLowerCase().includes(searchValue)) {
                country.cities.forEach(city => {
                    filteredResults.push({
                        title: city.name,
                        description: city.description,
                        imageUrl: city.imageUrl
                    });
                });
            }
        });
    }

    // Limit results to at least two recommendations
    filteredResults = filteredResults.slice(0, 2);

    console.log("Filtered Results:", filteredResults);

    displayResults(filteredResults);
}

// Function to display the search results
function displayResults(results) {
    console.log("displayResults function called");

    // Clear previous results
    searchResults.innerHTML = "";

    // Check if there are any results
    if (results.length === 0) {
        searchResults.innerHTML = "<p>No results found</p>";
        return;
    }

    // Create and append results to the searchResults element
    results.forEach(result => {
        const resultItem = document.createElement("div");
        resultItem.classList.add("result-item");
        resultItem.innerHTML = `
            <h3>${result.title}</h3>
            <p>${result.description}</p>
            <img src="${result.imageUrl}" alt="${result.title}" style="width: 100px; height: auto;">
        `;
        searchResults.appendChild(resultItem);
    });
}

// Event listeners
searchButton.addEventListener("click", searchTravelHub);
resetButton.addEventListener("click", clear);

// Function to clear the search input field
function clear() {
    console.log("clear function called");

    searchInput.value = ""; // Clear the search input field
    searchInput.focus();    // Set focus back to the search input field
    searchResults.innerHTML = ""; // Clear the search results
}
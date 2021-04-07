// ======================================================================================================
// ==========================================   Actual  Code   ==========================================
// ======================================================================================================

// Global Variables
var searchLat = 0;
var searchLon = 0;
var currentPageNum = 0;
var maximumPageNum = 0;

// Display Cards
var searchResults = document.getElementById("searchResults");

function displayResults(data_object) {

    // Clear Previous Results if any
    searchResults.innerHTML = "";

    // Check for non-zero results
    if (data_object.data != null) {

        for (var i = 0; i < data_object.data.length; i++) {
            var cardResult = document.createElement("div");

            var resultName = document.createElement("h4");
            resultName.innerHTML = data_object.data[i].name;

            var resultDiff = document.createElement("p");
            resultDiff.innerHTML = "Trail Difficulty: " + data_object.data[i].difficulty;

            var resultRate = document.createElement("p");
            resultRate.innerHTML = "Trail Rating: " + data_object.data[i].rating + "/5";

            cardResult.appendChild(resultName);
            cardResult.appendChild(resultDiff);
            cardResult.appendChild(resultRate);
            searchResults.appendChild(cardResult);
        };
        
    } else {
        var noResults = document.createElement("p");
        noResults.innerHTML = "no results";
        searchResults.appendChild(noResults);
        // No search results... Display "No trails nearby"
    }
};

// Trail Search Function
function trailSearch(pageNum, lat, lon) {
    var results_Number = 12;
    fetch("https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat="+ lat + "&lon=" + lon + "&page=" + pageNum + "&per_page=" + results_Number + "&radius=100", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "6cbc683214mshdf5038bf7d4e267p15a6f0jsn91fc8c373911",
            "x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com"
        }
    })
    .then(response => {
        return response.json();
    })
    .then(function (data){
        maximumPageNum = Math.ceil(data.results / results_Number);
        console.log(data);

        displayResults(data);
    });
};

// Update Page Number
function updatePageNum() {
    document.getElementById("pageNum").innerHTML = currentPageNum;
};

// Form Submission
var searchForm = document.getElementById("location");

searchForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Construct URL to be fetched
    var cityName = searchForm.firstElementChild.value.toLowerCase();
    var keyWeather = "22bb6e2db366aab8539ac22df7b32d3a"
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + keyWeather;

    fetch(weatherURL)
    .then(function(response) {

        // Checks for valid City
        if (response.status == 200) {
            return response.json();
        } else {
            return null;
        };
    })
    .then(function(data) {
        console.log(data);

        searchLat = data.coord.lat;
        searchLon = data.coord.lon;
        currentPageNum = 1;

        trailSearch(currentPageNum,searchLat,searchLon);
        updatePageNum();
    })
    .catch(err => {
        console.log(err);
    });

});

// Next Button
document.getElementById('nextBtn').addEventListener('click', function(){
    if (currentPageNum < maximumPageNum) {
        currentPageNum++;
        trailSearch(currentPageNum,searchLat,searchLon);
        updatePageNum();

        console.log('next');
    };
});

// Previous Button
document.getElementById('prevBtn').addEventListener('click', function(){
    if (currentPageNum > 1) {
        currentPageNum--;
        trailSearch(currentPageNum,searchLat,searchLon);
        updatePageNum();

        console.log('prev');
    };  
});




















// var currentTemp = 0;
// var currentHumi = 0;
// var currentUVI = 0;
// var currentWindSpe = 0;
// var currentWindGus = 0;
// var currentWindDeg = 0;


// var keyWeather = "22bb6e2db366aab8539ac22df7b32d3a";

// function getWeather (lat, lon, keyAPI) {

//     var weatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + keyAPI;

//     fetch(weatherURL)
//     .then(function(response) {
//         return response.json();                
//     })
//     .then(function(data) {
//         console.log(data);

//         currentTemp = data.current.temp;
//         currentHumi = data.current.humidity;
//         currentUVI = data.current.uvi;
//         currentWindSpe = data.current.wind_speed;
//         currentWindGus = data.current.wind_gust;
//         currentWindDeg = data.current.wind_deg;
//         console.log(currentTemp, currentHumi, currentUVI, currentWindSpe, currentWindGus, currentWindDeg);

//     })
//     .catch( err => {
//         console.log(err);
//     });

// };

// getWeather(90,43.88037021,keyWeather);
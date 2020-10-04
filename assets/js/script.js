$(document).ready(function () {
  var searchButton = document.querySelector("#button-addon2");
  var cityEntered = document.querySelector("#cityList");
  var cityList = [];

  arrayify();

  function arrayify() {
    // Get stored cities from localStorage and parse the JSON string to an array
    var storedCities = JSON.parse(localStorage.getItem("cities"));

    // If cities were fetched from localStorage, assign them to cityList array
    if (storedCities !== null) {
      cityList = storedCities;
    }
    // console.log(cityList);
    // Render cities to the page
    renderSearchedCities();
  }

  function renderSearchedCities() {
    $("#cityList").empty();
    // Uncomment the line below if you get the city variable in AJAX url to work
    document.getElementById('city-input').value = "";


    for (var i = 0; i < cityList.length + 1; i++) {
      var entry = cityList[i];

      var li = document.createElement("li");
      li.textContent = entry;
      $("li").attr("class", "list-group-item");
      li.setAttribute("data-index", i);
      cityEntered.append(li);
    }

    if (!entry) {
      return;
    }
  }


  function stringify() {
    var city = document.querySelector("#city-input").value;

    // Fix displayMessage error, add it after else...?
    if (city !== "") {
      console.log("Cool city!");

      var city = $("#city-input").val().trim();
      //Push to cityList array
      cityList.unshift(city);
      // then stringify
      cityListStorage = JSON.stringify(cityList);
      console.log(cityListStorage);
      localStorage.setItem("cities", cityListStorage);
    }
    arrayify();
  }



  // Trying to get event listeners on list items, but it's not working yet
  document.addEventListener("click", function (e) {
    if (e.target.nodeName == "<li>") {
      console.log("Hey, you clicked me!");
    }
  });



  // Listen for click on search button, and add city to localStorage
  //Figure out how to make Enter work in addition to button
  searchButton.addEventListener("click", function (event) {
    event.preventDefault();
    stringify();
    renderCurrent();
    // renderForecast();
  });


  var apiKey = "5f38cc51ae0ccd9325abd9a71adf92ba";
  // FIX THE VARIABLE CONCATENATION IN THE URLs!!!!
  // var citySearch = $("#city-input").val();

  // Here we are building the URL we need to query the database
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=minneapolis&appid=" + apiKey;

  function renderCurrent() {


    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function (response) {

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);

        // // Transfer content to HTML
        // $(".city").html("<h1>" + response.name + " Weather Details</h1>");
        // $(".wind").text("Wind Speed: " + response.wind.speed);
        // $(".humidity").text("Humidity: " + response.main.humidity);

        // Convert the temp to fahrenheit
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;

        // // add temp content to html
        // $(".temp").text("Temperature (K) " + response.main.temp);
        // $(".tempF").text("Temperature (F) " + tempF.toFixed(2));

        // // Log the data in the console as well
        // console.log("Wind Speed: " + response.wind.speed);
        // console.log("Humidity: " + response.main.humidity);
        // console.log("Temperature (F): " + tempF);
      });
  }

});
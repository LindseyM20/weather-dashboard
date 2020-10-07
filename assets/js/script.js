$(document).ready(function () {
  // Get stored cities from localStorage and parse the JSON string to an array
  var storedCities = JSON.parse(localStorage.getItem("cities")) || [];
  var city;
  console.log(storedCities);
  console.log(city);
  var citiesEntered = document.querySelector("#cityList");
  var cityList = [];


  arrayify();

  function arrayify() {
    // If cities were fetched from localStorage, assign them to cityList array
    if (storedCities !== null) {
      cityList = storedCities;
    }
    renderSearchedCities();
  }

  
  // Display list of previously searched cities
  function renderSearchedCities() {
    $("#cityList").empty();
    $("#city-input").val("");

    for (var i = 0; i < cityList.length + 1; i++) {
      var entry = (cityList[i]);
      var li = document.createElement("li");
      li.textContent = entry;
      $("li").attr("class", "list-group-item");
      li.setAttribute("data-index", i);
      citiesEntered.append(li);
    }

    // Event listener for list items
    $("li").on("click", function (event) {
      event.preventDefault();
      city = $(this).text();
      console.log(city);
      var index = $(this).attr("data-index");
      cityList.splice(index, 1);
      cityList.unshift(city);
      renderCurrent();
      renderSearchedCities();
    });

    if (!entry) {
      return;
    }
  }


  function stringify() {
    if (city !== "") {
      console.log("Cool city!");

      // Push to cityList array
      cityList.unshift(city);
      // then stringify
      cityListStorage = JSON.stringify(cityList);
      console.log(cityListStorage);
      localStorage.setItem("cities", cityListStorage);
    }
    arrayify();
  }


  function renderCurrent() {
    city = storedCities[0];
    // Building the URL needed to query the database
    var apiKey = "5f38cc51ae0ccd9325abd9a71adf92ba";
    var queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

    // Run an AJAX call to the OpenWeatherMap API to get latitude & longitude
    $.ajax({
      url: queryURL1,
      method: "GET"
    })
      // Store all of the retrieved data inside an object called "response"
      .then(function (response1) {
        console.log(queryURL1);
        console.log(response1);

        // Get the latitude and longitude for using in the URL for the next AJAX call
        var lat = response1.coord.lat;
        var lon = response1.coord.lon;
        var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely&appid=" + apiKey;

        // Run an AJAX call to the OpenWeatherMap API, plugging in lat & lon to get the other stats
        $.ajax({
          url: queryURL2,
          method: "GET"
        })
          // Store all of the retrieved data inside an object called "response"
          .then(function (response2) {
            console.log(queryURL2);
            console.log(response2);
            var UVindex = response2.current.uvi;

            // Convert the temp to fahrenheit
            function tempToF(x) {
              var tempF = (x - 273.15) * 1.8 + 32;
              tempF = tempF.toFixed(1);
              return tempF;
            }

            // Transfer content to HTML
            $("#cityAndDate").html("<h3>" + response1.name + " " + moment().format('L') + "<h3>");
            $("#icon").attr("src", "http://openweathermap.org/img/wn/" + response2.current.weather[0].icon + "@2x.png");
            $("#currentTemp").text("Temperature: " + tempToF(response2.current.temp) + "°F");
            $("#currentHumidity").text("Humidity: " + response1.main.humidity + "%");
            $("#wind").text("Wind Speed: " + response1.wind.speed + " MPH");
            $("#UV-index").html("UV Index:  <span>" + UVindex + "<span>");

            // Set UV Index color based on severity
            if (UVindex <= 2) {
              $("span").css("background-color", "green")
            } else if (UVindex <= 6) {
              $("span").css("background-color", "yellow")
            } else if (UVindex <= 8) {
              $("span").css("background-color", "orange")
            } else {
              $("span").css("background-color", "red")
            }

            // Set the date on the forecast cards
            var day1 = moment().add(1, 'day').format('L');
            var day2 = moment().add(2, 'day').format('L');
            var day3 = moment().add(3, 'day').format('L');
            var day4 = moment().add(4, 'day').format('L');
            var day5 = moment().add(5, 'day').format('L');
            $("#date1").text(day1);
            $("#date2").text(day2);
            $("#date3").text(day3);
            $("#date4").text(day4);
            $("#date5").text(day5);

            // Display Temps, Humidity, and icons for forecast cards
            for (var k = 1; k < 6; k++) {
              // Temp
              var cardTempF = tempToF(response2.daily[k].temp.day);
              $("#cardTemp" + k).text("Temp: " + cardTempF + "°F");
              // Humidity
              $("#cardHum" + k).text("Humidity: " + response2.daily[k].humidity + "%");
              // Icon
              var cardIcon = "http://openweathermap.org/img/wn/" + response2.daily[k].weather[0].icon + "@2x.png";
              $("#icon" + k).attr("src", cardIcon);
            }
          });
      });
  }


  // Event listener for search button
  $("#button-addon2").on("click", function (event) {
    event.preventDefault();
    city = $("#city-input").val().trim();
    stringify(citiesEntered);
    renderCurrent();
  });


  // Event listener for list items
  $("li").on("click", function (event) {
    event.preventDefault();
    city = $(this).text();
    console.log(city);
    renderCurrent();
  });

renderCurrent();

});

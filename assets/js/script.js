$(document).ready(function () {
  var searchButton = document.querySelector("#button-addon2");
  var city;
  //  = document.querySelector("#city-input").value;
  var citiesEntered = document.querySelector("#cityList");
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


    // TRIED TO MAKE A FUNCTION THAT WOULD CAPITALIZE THE FIRST LETTER OF CITY ENTERED, BUT GAVE UP
    // function capitalize(str) {
    //   str = str.split(" ");

    //   for (var j = 0; j < str.length; j++) {
    //     str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    //   }
    //   return str.join(" ");
    // }



    for (var i = 0; i < cityList.length + 1; i++) {
      var entry = (cityList[i]);

      var li = document.createElement("li");
      li.textContent = entry;
      $("li").attr("class", "list-group-item");
      li.setAttribute("data-index", i);
      citiesEntered.append(li);
    }

    if (!entry) {
      return;
    }
  }


  function stringify() {
    // var city = document.querySelector("#city-input").value;
    // city = $("#city-input").val().trim();

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

  // Search button event handler, and add city to localStorage
  //Figure out how to make Enter work in addition to button
  // searchButton.addEventListener("click", function (event) 
  $("button").on("click", function (event) {
    event.preventDefault();
    city = $("#city-input").val().trim();
    stringify(citiesEntered);
    renderCurrent();
    // renderForecast();
  });



  // Event listener for list items
  $("li").on("click", function (event) {
    event.preventDefault();
    city = $(this).text();
    console.log(city);
    renderCurrent();
    // renderForecast();
  });



  function renderCurrent() {

    // Here we are building the URL we need to query the database
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

        // Get the latitude and longitude for using in the other AJAX call
        var lat = response1.coord.lat;
        var lon = response1.coord.lon;

        var apiKey = "5f38cc51ae0ccd9325abd9a71adf92ba";
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

            // Convert the temp to fahrenheit
            function tempToF(x) {
              var tempF = (x-273.15) * 1.8 + 32;
              tempF = tempF.toFixed(1);
              return tempF;
            }

            var UVindex = response2.current.uvi;

            // Transfer content to HTML
            $("#cityAndDate").html("<h3>" + response1.name + " " + moment().format('L') + "<h3>");
            $("#currentTemp").text("Temperature (F) " + tempToF(response2.current.temp));
            $("#currentHumidity").text("Humidity: " + response1.main.humidity);
            $("#wind").text("Wind Speed: " + response1.wind.speed);
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


            // Display Temps for forecast cards
            // var cardTempF = tempToF(response2.daily.1.temp.day);
            // $("#card1temp").text(response2.);

          });



      });
  }



});

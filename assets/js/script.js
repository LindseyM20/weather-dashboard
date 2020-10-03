var searchButton = document.querySelector("#button-addon2");
var cityEntered = document.querySelector("#cityList");
var cityList = [];

arrayify();

function renderSearchedCities() {
  $("#cityList").empty();


  for (var i = 0; i < cityList.length; i++) {
    var entry = cityList[i];

    var li = document.createElement("li");
    li.textContent = entry;
    li.setAttribute("data-index", i);
    li.textContent = cityList[i];
    cityEntered.prepend(li);

    // Try to figure out how to clear input... this isn't working
    $("#city-input").empty();

  }

  if (!entry) {
    return;
  }
}

function arrayify() {
  // Get stored cities from localStorage and parse the JSON string to an array
  var storedCities = JSON.parse(localStorage.getItem("cities"));

  // If cities were fetched from localStorage, assign them to cityList array
  if (storedCities !== null) {
    cityList = storedCities;
  }
  console.log(cityList);

  // Render cities to the page
  renderSearchedCities();
}


searchButton.addEventListener("click", function(event) {
  event.preventDefault();

  var city = document.querySelector("#city-input").value;

  // Fix displayMessage error, add it after else...?
  if (city === "") {
    // displayMessage("error", "City cannot be blank");
  }  else {
    console.log("success", "Cool city!");

    var city = $("#city-input").val().trim();
    //Push to cityList array
    cityList.push(city);
    console.log(cityList);
    // then stringify?
    cityListStorage = JSON.stringify(cityList);
    console.log(cityListStorage);
    localStorage.setItem("cities", cityListStorage);
    renderSearchedCities();
  }
});
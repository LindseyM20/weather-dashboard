

// Event listener for list items
$("li").on("click", function () {
  var listCity = $(this).text();
  renderCurrent();
  // renderForecast(listItem);

  return listCity;
});

if () {
  AJAXcity = 
  } else {
  AJAXcity = 
  }




// Trying to get event listeners on list items, but it's not working yet
document.addEventListener("click", function (event) {
  event.preventDefault();
  var target = $(event.target);
  if (target.is("li")) {
    AJAXcity = listCity
    console.log(AJAXcity);
    console.log($(this).text);
    // renderCurrent();
  } else {
    AJAXcity = city;
    console.log(AJAXcity);
  }


  return AJAXcity;
});


    // // Trying to get event listeners on list items, but it's not working yet
    // document.addEventListener("click", function (event) {
    //   var target = $(event.target);
    //   if (target.is ("li")) {
    //     city = $(this).text();
    //     console.log("Hey, you clicked me!");
    //     renderCurrent();
    //   }
    // });






// FROM SAMER
// function currentWeather(cityName) {
//   var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + ",us&units=imperial&appid=0ee12c32cce8e87dbfe9e6d43d3583a0";
//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   })
//     .then(function (response) {


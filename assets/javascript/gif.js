$(document).ready(function() {
  //console.log("Ready!");

  let topics = ["Lannister", "Stark", "Targaryen", "Baratheon"];

  function displayGif() {
    $("#image-display").empty();
    let input = $(this).attr("data-name");
    let limit = 10;
    let queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      input +
      "&limit=" +
      limit +
      "&api_key=IljACbwiZbYfWHJLdecOLVBu4UFjI9d1";

    //perform GET request to the API
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      // console.log(response);
      for (let i = 0; i < limit; i++) {
        let display = $("<div>");
        display.addClass("image-container");

        let gif = $("<img>");
        gif.attr("src", response.data[i].images.original_still.url);
        gif.attr("gif-still", response.data[i].images.original_still.url);
        gif.attr("gif-animated", response.data[i].images.original.url);
        gif.attr("gif-state", "still");
        gif.attr("class", "gif");
        display.append(gif);

        let gifRating = response.data[i].rating;
        //console.log(rating);
        let ratingDisplay = $("<p>").text("Rating" + gifRating);
        display.append(ratingDisplay);

        $("#image-display").append(display);
      }
    });
  }
  

  //dont lose these
});

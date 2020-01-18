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
      //console.log(response);
      for (let i = 0; i < limit; i++) {
        let display = $("<div>");
        display.addClass("gif-container")
        //console.log(display);

        let gif = $("<img>");
        gif.attr("src", response.data[i].images.original_still.url);
        gif.attr("gif-still", response.data[i].images.original_still.url);
        gif.attr("gif-animated", response.data[i].images.original.url);
        gif.attr("gif-state", "still");
        gif.attr("class", "gif");
        display.append(gif);
        console.log(gif);

        let gifRating = response.data[i].rating;
      
        //console.log(rating);
        let ratingDisplay = $("<p>").text("Rating: " + gifRating);
        ratingDisplay.attr("class", "badge badge-secondary")
        display.append(ratingDisplay);

        $("#image-display").append(display);
        console.log(response);
      }
    });
  }
  //displayGif();

  function animateGif() {
    let currentState = $(this).attr("gif-state");
    let gifAnimate = $(this).attr("gif-animate");
    let gifStill = $(this).attr("gif-still");

    if (currentState == "still") {
      $(this).attr("src", gifAnimate);
      $(this).attr("gif-state", "animate");
    } else if (currentState == "animate") {
      $(this).attr("src", gifStill);
      $(this).attr("gif-state", "still");
    }
  }

  function makeButton() {
    $("#display-buttons").empty();

    for (let j = 0; j < topics.length; j++) {
      let newButton = $("<button>" + topics[j] + "</button>");
      newButton.attr("class", "btn btn-dark");
      newButton.attr("id", "input");
      newButton.attr("data-name", topics[j]);

      $("#display-buttons").append(newButton);
    }
  }

  $("#submitButton").on("click", function() {
    let input = $("#user-input")
      .val()
      .trim();
      
    form.reset();
    topics.push(input);

    makeButton();

    return false;
  });

  makeButton();


  $("#display-buttons").on("click", "#input", displayGif);
  $(document).on("click", ".gif", animateGif);

  //dont lose these
});

var gamePattern = []
var buttonColours = ["red", "blue", "green", "yellow"]
var userClickedPattern = []

function nextSequence() {
    var random = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[random]
    gamePattern.push(randomChosenColour)
    playSound(randomChosenColour)
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100)
}

$(document).on("keydown", function () {
  nextSequence();
});

$(".btn").on("click", function() {
    var userChosenColor = $(this).attr("id")
    userClickedPattern.push(userChosenColor)
    playSound(userChosenColor)
    console.log(userClickedPattern)

})

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
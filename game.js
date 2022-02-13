var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

//Clicked a Keyboard Key to Start a Game 
$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }

});

// Take a User Input and verify answer
$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    console.log("userClickedPattern : " + userClickedPattern);

    checkAnswer(userClickedPattern.length - 1);
});

// Compare a gamePattern and userClickedPattern
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
  
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
  
      } else {
        startOver();
        console.log("wrong");
        
        playSound("wrong");
  
        $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
  
        $("#level-title").text("Game Over, Press Any Key to Restart");
      }
}

// Create a Random gamePattern
function nextSequence() {

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * buttonColors.length);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    // se jQuery to animate a flash to the button
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    // the sound for the button colour
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    console.log("gamePattern : " + gamePattern);
    $("h1").append ("<h5>Point: "+level*5+"</h5 >")
} 

//Play a Sound 
function playSound(randomChosenColour) {
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
}

// Animate when clicked
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () { $("#" + currentColour).removeClass("pressed"); }, 100);
}

// Reset all paramater once Game is over
function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}



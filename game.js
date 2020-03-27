
var userClickedPattern = []
var gamePattern = []
var buttonColors = ["red", "blue", "green", "yellow"];
var green = new Audio('sounds/green.mp3');
var red = new Audio('sounds/red.mp3');
var yellow = new Audio('sounds/yellow.mp3');
var blue = new Audio('sounds/blue.mp3');
var wrong = new Audio('sounds/wrong.mp3')
var level = 1


function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    return randomChosenColor;
}




$(".btn").on("click", function (e){
    $("." + e.target.id ).fadeOut(100).fadeIn(100);
    
    switch (e.target.id){
        case "green":
            green.play();
            break;
        case "red":
            red.play();
            break;
        case "yellow":
            yellow.play();
            break;
        case "blue":
            blue.play();
            break;
        default:
            break;
    }
});


function check(gp, up) {
    var gp = gamePattern.length
    var up = userClickedPattern.length
    //console.log("check: " + gp + " " + up)
    if (gp === up) {
        //console.log(gamePattern, userClickedPattern)
        if (JSON.stringify(gamePattern) == JSON.stringify(userClickedPattern)) {
            level++;
            $("#level-title").text("Level " + level)
            var ns = nextSequence();
            setTimeout(() => { animatedPress(ns); }, 2000);
            
            gamePattern.push(ns);


            userClickedPattern = []


        }
        else {
            wrong.play();
            $('body').addClass("game-over")
            setTimeout(() => { $('body').removeClass("game-over"); }, 200);
            $("h1").text("Press any key to restart")
            $(document).on('keydown', function (e) {
                location.reload();
            });
            
        }
    }

}


$(".btn").on("click", function (e) {
    var userChosenColor = e.target.id
    userClickedPattern.push(userChosenColor)
    check()
})


function animatedPress(name) {
    $('.'+name).addClass("pressed");
    setTimeout(() => { $('.' + name).removeClass("pressed"); }, 100);
}


started = false

$(document).on('keydown', function (e) {
    if (!started) {
        // Do something
        $("#level-title").text("Level " + level)
        var ns = nextSequence();
        animatedPress(ns);
        gamePattern.push(ns);
        started = true;
    }
});


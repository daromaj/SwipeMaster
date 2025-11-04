// Game State Variables
var gameState = {
    score: 0,
    lives: 3,
    timeLimit: 2.0,
    currentTimeLeft: 2.0,
    baseTimeLimit: 2.0,
    timeDecreaseRate: 0.05, // Decrease 50ms per successful swipe
    minTimeLimit: 0.5, // Minimum time limit
    gameStarted: false,
    timerInterval: null,
    animationInProgress: false
};

// Ball and board variables
var ballSize = 40;
var screenWidth = $(window).width();
var screenHeight = $(window).height();
var boardSize = Math.floor(Math.min(screenHeight, screenWidth) / 3);
var borderWidth = 30;
var colors = ["#00ffff", "#ff00ff", "#ffff00", "#00ff00"]; // Neon cyan, magenta, yellow, green
var blockEvents = false;

$(function () {
    screenSetup();
    startCountdown();

    // Add resize handler for responsive behavior
    var resizeTimer;
    $(window).on('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (!blockEvents) {
                screenSetup();
            }
        }, 250);
    });

    // Restart button handler
    $('#restart-btn').on('click', function() {
        restartGame();
    });
});

function screenSetup() {
    // Recalculate dimensions based on current window size
    screenWidth = $(window).width();
    screenHeight = $(window).height();
    boardSize = Math.floor(Math.min(screenHeight, screenWidth) / 3);

    $(".gameboard").css({
        "width": boardSize * 2,
        "height": boardSize * 2
    });
    $(".gameboard.rotatable").css({
        "margin-top": ((boardSize + borderWidth) * -2),
        "border-top-color": colors[0],
        "border-right-color": colors[1],
        "border-bottom-color": colors[2],
        "border-left-color": colors[3]
    });
    $(".gameboard.no-border").css({
        "border-color": "#252525"
    });

    // Only set ball color on initial setup, not on resize
    if ($(".ball").css("background-color") === "rgba(0, 0, 0, 0)" ||
        $(".ball").css("background-color") === "transparent") {
        setBallColor();
    }
}

function startCountdown() {
    var count = 3;
    $('#countdown-number').text(count);

    var countdownInterval = setInterval(function() {
        count--;
        if (count > 0) {
            $('#countdown-number').text(count);
            // Restart animation
            $('#countdown-number').css('animation', 'none');
            setTimeout(function() {
                $('#countdown-number').css('animation', 'countdown-pulse 1s ease-in-out');
            }, 10);
        } else if (count === 0) {
            $('#countdown-number').text('GO!');
            $('#countdown-number').css('animation', 'none');
            setTimeout(function() {
                $('#countdown-number').css('animation', 'countdown-pulse 1s ease-in-out');
            }, 10);
        } else {
            clearInterval(countdownInterval);
            $('#countdown-overlay').fadeOut(300, function() {
                startGame();
            });
        }
    }, 1000);
}

function startGame() {
    gameState.gameStarted = true;
    gameState.score = 0;
    gameState.lives = 3;
    gameState.timeLimit = gameState.baseTimeLimit;
    updateScore();
    updateLives();
    $('#timer-display').removeClass('hidden');
    startTimer();
}

function startTimer() {
    gameState.currentTimeLeft = gameState.timeLimit;
    updateTimerDisplay();

    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
    }

    gameState.timerInterval = setInterval(function() {
        gameState.currentTimeLeft -= 0.01; // Decrease by 10ms

        if (gameState.currentTimeLeft <= 0) {
            gameState.currentTimeLeft = 0;
            updateTimerDisplay();
            clearInterval(gameState.timerInterval);
            loseLife();
        } else {
            updateTimerDisplay();
        }
    }, 10);
}

function updateTimerDisplay() {
    var percentage = (gameState.currentTimeLeft / gameState.timeLimit) * 100;
    $('#timer-bar').css('width', percentage + '%');
    $('#timer-text').text(gameState.currentTimeLeft.toFixed(2) + 's');
}

function updateScore() {
    $('#score').text(gameState.score);
}

function updateLives() {
    var livesText = '';
    for (var i = 0; i < gameState.lives; i++) {
        livesText += '❤';
    }
    for (var j = gameState.lives; j < 3; j++) {
        livesText += '🖤';
    }
    $('#lives').html(livesText);
}

function loseLife() {
    gameState.lives--;
    updateLives();

    if (gameState.lives <= 0) {
        gameOver();
    } else {
        // Flash the screen to indicate lost life with neon red effect
        $('body').css('background', 'radial-gradient(ellipse at center, rgba(255, 0, 100, 0.8) 0%, rgba(255, 0, 0, 0.3) 100%)');
        setTimeout(function() {
            $('body').css('background', 'radial-gradient(ellipse at center, #0a0a0f 0%, #000000 100%)');
        }, 200);

        // Reset timer and continue
        setTimeout(function() {
            if (!gameState.animationInProgress) {
                startTimer();
            }
        }, 500);
    }
}

function gameOver() {
    gameState.gameStarted = false;
    clearInterval(gameState.timerInterval);
    blockEvents = true;

    $('#final-score').text(gameState.score);
    $('#game-over').removeClass('hidden').hide().fadeIn(500);
}

function restartGame() {
    // Reset game state
    gameState.score = 0;
    gameState.lives = 3;
    gameState.timeLimit = gameState.baseTimeLimit;
    gameState.currentTimeLeft = gameState.baseTimeLimit;
    gameState.gameStarted = false;
    gameState.animationInProgress = false;
    blockEvents = false;

    // Clear any existing timers
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
    }

    // Hide game over screen
    $('#game-over').fadeOut(300);

    // Reset ball and board
    resetBall();
    setBallColor();
    colors = ["#00ffff", "#ff00ff", "#ffff00", "#00ff00"]; // Neon cyan, magenta, yellow, green
    screenSetup();

    // Hide timer temporarily
    $('#timer-display').addClass('hidden');

    // Start countdown again
    setTimeout(function() {
        $('#countdown-overlay').show();
        startCountdown();
    }, 500);
}

function setBallColor() {
    var i = (Math.floor(Math.random() * 4));
    $(".ball").css({
        "background-color": colors[i]
    });
}

function rotateBoard() {
    var angle;
    do {
        angle = (Math.floor(Math.random() * 4) - 2);
    } while (angle === 0);
    shiftColors(angle);
    $(".gameboard.rotatable").animateRotate(90 * angle, 300, "linear");
}

function shiftColors(value) {
    if (value > 0) {
        for (var i = 0; i < value; i++) {
            var c = colors.pop();
            colors.unshift(c);
        }
    } else {
        for (var i = value; i < 0; i++) {
            var c = colors.shift();
            colors.push(c);
        }
    }
}

function resetBall() {
    var c = $(".ball").css("background-color");
    $(".ball").removeAttr("style");
    $(".ball").css({
        "background-color": c
    });
}

function onSuccessfulSwipe() {
    // Stop the current timer
    clearInterval(gameState.timerInterval);

    // Increase score
    gameState.score += 10;
    updateScore();

    // Decrease time limit for next round (make it harder)
    gameState.timeLimit = Math.max(
        gameState.minTimeLimit,
        gameState.timeLimit - gameState.timeDecreaseRate
    );

    // Don't start timer yet, wait for animation to complete
}

function animBall(dir) {
    if (!gameState.gameStarted) return;

    blockEvents = true;
    gameState.animationInProgress = true;

    $('.ball').stop(true, true);//stops animation in progress
    resetBall();
    var animobject = {};
    var prop = 4;
    var stretch = Math.floor(ballSize / prop);
    var distance = Math.floor(boardSize / 2) - stretch;
    var duration = 200;
    var lastStep = 3;
    var ballColor = $(".ball").css("background-color");
    var isCorrectMatch = false;

    switch (dir) {
        case "l":
        {
            if(ballColor !== colors[3]){
                lastStep = 2;
            } else {
                isCorrectMatch = true;
            }
            animobject = [{
                    "margin-left": "-=" + distance,
                    "height": "-=" + stretch,
                    "width": "+=" + stretch,
                    "margin-top": "+=" + Math.floor(stretch / 2)
                }, {
                    "margin-left": "-=" + distance
                }, {
                    "height": "+=" + (stretch * 3),
                    "width": "-=" + (stretch * 3),
                    "margin-top": "-=" + stretch
                }, {
                    "height": "+=" + (stretch),
                    "width": "-=" + (stretch),
                    "margin-left": "-=" + (stretch * 3),
                    "margin-top": "-=" + Math.floor(stretch / 2)
                }];
            break;
        }
        case "t":
        {
            if(ballColor !== colors[0]){
                lastStep = 2;
            } else {
                isCorrectMatch = true;
            }
            animobject = [{
                    "margin-top": "-=" + distance,
                    "height": "+=" + stretch,
                    "width": "-=" + stretch
                }, {
                    "margin-top": "-=" + distance
                }, {
                    "height": "-=" + (stretch * 3),
                    "width": "+=" + (stretch * 3)
                }, {
                    "margin-top": "-=" + (stretch * 3),
                    "height": "-=" + (stretch),
                    "width": "+=" + (stretch)
                }];
            break;
        }
        case "r":
        {
            if(ballColor !== colors[1]){
                lastStep = 2;
            } else {
                isCorrectMatch = true;
            }
            animobject = [{
                    "margin-left": "+=" + distance,
                    "height": "-=" + stretch,
                    "width": "+=" + stretch,
                    "margin-top": "+=" + Math.floor(stretch / 2)
                }, {
                    "margin-left": "+=" + distance
                }, {
                    "margin-left": "+=" + (stretch * 2),
                    "height": "+=" + (stretch * 3),
                    "width": "-=" + (stretch * 3),
                    "margin-top": "-=" + stretch
                }, {
                    "margin-left": "+=" + (stretch * 3),
                    "height": "+=" + (stretch),
                    "width": "-=" + (stretch),
                    "margin-top": "-=" + Math.floor(stretch / 2)
                }];
            break;
        }
        case "b":
        {
            if(ballColor !== colors[2]){
                lastStep = 2;
            } else {
                isCorrectMatch = true;
            }
            animobject = [{
                    "margin-top": "+=" + distance,
                    "height": "+=" + stretch,
                    "width": "-=" + stretch
                }, {
                    "margin-top": "+=" + distance
                }, {
                    "margin-top": "+=" + (stretch * 2),
                    "height": "-=" + (stretch * 3),
                    "width": "+=" + (stretch * 3)
                },{
                    "margin-top": "+=" + (stretch * 3),
                    "height": "-=" + (stretch),
                    "width": "+=" + (stretch)
                }];
            break;
        }
    }

    $(".ball")
            .animate(animobject[0], Math.floor(distance * duration / (distance * 2)), "linear")
            .animate(animobject[1], Math.floor((distance - (stretch * 2)) * duration / (distance * 2)), "linear")
            .animate(animobject[lastStep], Math.floor((stretch * 8) * duration / (distance * 2)), "linear")
            .promise().done(function () {
        resetBall();
        setBallColor();
        rotateBoard();

        if (isCorrectMatch) {
            onSuccessfulSwipe();
        }

        gameState.animationInProgress = false;
        blockEvents = false;

        // Start new timer after animation completes
        if (gameState.gameStarted && gameState.lives > 0) {
            startTimer();
        }
    });
}

// Swipe event handlers
$(window).on("swipeleft", function () {
    if (blockEvents || !gameState.gameStarted)
        return;
    animBall("l");
});
$(window).on("swiperight", function () {
    if (blockEvents || !gameState.gameStarted)
        return;
    animBall("r");
});
$(window).on("swipedown", function () {
    if (blockEvents || !gameState.gameStarted)
        return;
    animBall("b");
});
$(window).on("swipeup", function () {
    if (blockEvents || !gameState.gameStarted)
        return;
    animBall("t");
});

// Keyboard event handlers
$(document).keydown(function (e) {
    if (blockEvents || !gameState.gameStarted)
        return;
    switch (e.which) {
        case 37:
            animBall("l");// left
            break;

        case 38:
            animBall("t");// up
            break;

        case 39:
            animBall("r");// right
            break;

        case 40:
            animBall("b");// down
            break;

        default:
            return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});
